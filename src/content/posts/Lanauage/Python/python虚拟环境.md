# 虚拟环境

Python 虚拟环境用 `venv`（标准库自带，不用额外安装）：

## 创建

```bash
python3 -m venv myenv        # myenv 是目录名，随便起
```

## 激活

```bash
source myenv/bin/activate     # macOS/Linux
# myenv\Scripts\activate      # Windows
```

激活后终端会显示 `(myenv)` 前缀，之后 `pip install` 的包都装在这个环境里。

## 退出

```bash
deactivate
```

## 常用套路

```bash
# 创建 + 激活 + 装包
python3 -m venv .venv
source .venv/bin/activate
pip install requests flask

# 导出/恢复依赖
pip freeze > requirements.txt
pip install -r requirements.txt
```
> 如果要使用uv

```sh
# 创建虚拟环境
uv venv

# 安装包
uv pip install mcp

# 从requirements.txt安装
uv pip install -r requirements.txt

# 同步环境(安装缺失的包，移除多余的包)
uv pip sync requirements.txt
```

## 几个要点

- **`.venv` 目录不用提交到 git**，加到 `.gitignore` 里
- 每个项目一个虚拟环境，互不干扰
- 不激活也能用：`.venv/bin/python script.py`
- VS Code 会自动检测 `.venv`，选对解释器就行

基本上就是 **创建 → 激活 → 装包 → 写码 → deactivate**，没什么复杂的 🐾