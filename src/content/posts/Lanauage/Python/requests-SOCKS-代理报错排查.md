---
title: "requests 报错 Missing dependencies for SOCKS support 的排查"
date: "2026-07-30"
tags: ["Python", "requests", "urllib3", "代理"]
---

## 问题现象

运行 `akshare` 获取股票数据时，报错如下：

```
requests.exceptions.InvalidSchema: Missing dependencies for SOCKS support.
```

完整调用栈：

```
File "fetchdata.py", line 14, in <module>
    stock_zh_a_hist_df = ak.stock_zh_a_hist(...)
  File "akshare/stock_feature/stock_hist_em.py", line 992, in stock_zh_a_hist
    r = requests.get(url, params=params, timeout=timeout)
  ...
  File "requests/adapters.py", line 662, in send
    conn = self.get_connection_with_tls_context(request, verify, proxies=proxies, cert=cert)
  File "requests/adapters.py", line 500, in get_connection_with_tls_context
    proxy_manager = self.proxy_manager_for(proxy)
  File "requests/adapters.py", line 285, in proxy_manager_for
    manager = self.proxy_manager[proxy] = SOCKSProxyManager(...)
  File "requests/adapters.py", line 67, in SOCKSProxyManager
    raise InvalidSchema("Missing dependencies for SOCKS support.")
```

代码本身并没有使用 SOCKS 代理或 `PySocks`，为什么报这个错？

---

## 排查过程

### 1. 检查代理环境变量

```bash
env | grep -i proxy
# 无输出
```

所有 `http_proxy` / `https_proxy` / `all_proxy` 等环境变量均未设置，排除了环境变量导致的代理配置。

### 2. 检查已安装的 SOCKS 依赖

```bash
pip list | grep -i socks
# socksio  1.0.0
```

`socksio` 已安装，但这是一个 SOCKS 协议的 I/O 实现库，并非 `urllib3` 所要求的 `PySocks`。

### 3. 检查 requests 的 SOCKSProxyManager 源码

```python
from requests.adapters import SOCKSProxyManager
import inspect
print(inspect.getsource(SOCKSProxyManager))
```

输出：

```python
def SOCKSProxyManager(*args, **kwargs):
    raise InvalidSchema("Missing dependencies for SOCKS support.")
```

这是一个**桩函数**（stub），永远抛异常。这说明 `requests` 没有找到可用的 SOCKS 实现。

### 4. 检查 urllib3 的 SOCKS 支持

```python
from urllib3.contrib import socks
```

输出：

```
ModuleNotFoundError: No module named 'socks'
```

同时也有一条警告：

```
DependencyWarning: SOCKS support in urllib3 requires the installation
of optional dependencies: specifically, PySocks.
```

**关键发现**：`urllib3.contrib.socks` 内部执行 `import socks`（即 `PySocks`），但这个包没有安装。

### 5. 追查代理来源

既然环境变量没设代理，那代理配置从哪来？

```python
from urllib.request import getproxies
print(getproxies())
# {'http': 'http://127.0.0.1:7890',
#  'https': 'http://127.0.0.1:7890',
#  'socks': 'http://127.0.0.1:7890'}
```

**真相大白**：macOS 系统偏好设置 → 网络 → 代理 中配置了 SOCKS 代理（`127.0.0.1:7890`，通常来自 Clash / V2Ray / Surge 等代理工具）。Python 的 `urllib.request.getproxies()` 会自动读取 macOS 的系统代理设置。

`requests` 的 `trust_env=True`（默认值）会信任系统代理配置，发现 SOCKS 代理后，就去初始化 `SOCKSProxyManager` → 触发桩函数 → 抛异常。

---

## 完整调用链

```
macOS 系统代理设置 (127.0.0.1:7890, 含 SOCKS)
  → urllib.request.getproxies() 读取系统代理
    → requests.Session(trust_env=True) 使用系统代理
      → HTTPAdapter.proxy_manager_for() 检测到 SOCKS 代理 URL
        → SOCKSProxyManager() ← 桩函数，永远抛异常
          → urllib3.contrib.socks 需要 import socks (PySocks)
            → PySocks 未安装 → InvalidSchema
```

---

## 解决方案

```bash
pip install PySocks
```

安装后验证：

```python
from urllib3.contrib import socks
# SOCKS support OK
```

重新运行脚本，问题解决。

**另一种方案（如果不想走代理）**：

```python
import requests
session = requests.Session()
session.trust_env = False  # 忽略系统代理
```

或者在运行脚本前临时关闭代理工具（Clash / V2Ray 等），这样 `getproxies()` 就不会返回 SOCKS 配置。

---

## 小结

- **不是你代码引用了 SOCKS，是系统的代理配置触发了它。**
- 这是 `requests` / `urllib3` 的**可选依赖缺失**问题：系统配置了 SOCKS 代理，但 Python 环境没有安装 SOCKS 支持所需的 `PySocks`。
- 任何通过系统代理发 HTTP 请求的 Python 脚本都可能遇到此问题，与是否显式配置代理无关。
