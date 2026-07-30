# VS Code Pylance 无法解析已安装库的排查

## 症状

在 VS Code 中打开 Python 文件，Pylance 报 `无法解析导入 "xxx"`，但这些库明明已经装在了项目的虚拟环境里。即使你在右下角状态栏手动选择了正确的 venv 解释器，问题依然存在。

## 排查过程

### 1. 先确认包确实装在了 venv 里

```bash
./myenv/bin/pip list | grep openai
# openai  2.50.0  ← 包确实在 venv 里

./myenv/bin/python -c "import openai"
# 无报错，可以正常导入  ← venv 没问题
```

`settings.json` 里也正确配置了 `python.defaultInterpreterPath`，指向 venv 的 python：

```json
"python.defaultInterpreterPath": "${workspaceFolder}/herness-agent/myenv/bin/python"
```

包是好的，路径也是对的，但 Pylance 就是不认——说明**解释器根本没切过去**。

### 2. 定位真凶：`python-envs.pythonProjects`

打开 `.vscode/settings.json`，关键在这里：

```json
{
    "python-envs.pythonProjects": [
        {
            "path": ".",
            "envManager": "ms-python.python:venv",
            "packageManager": "ms-python.python:pip"
        }
    ],
    "python.defaultInterpreterPath": "${workspaceFolder}/herness-agent/myenv/bin/python"
}
```

**`python-envs.pythonProjects` 是 Python Environments 扩展的配置**，一旦配置了它，这个扩展就会**接管所有 Python 环境发现**。

### 3. 为什么右下角手动选了解释器还是不行

两个原因叠加：

- **`python-envs` 接管了环境管理**——它会根据 `"path": "."` 在项目根目录下扫描标准的 venv 目录名（`.venv`、`venv`、`.virtualenvs`）。实际的 venv 在 `herness-agent/myenv/`，不在根目录，也不叫标准名字，扩展找不到它，于是**回退到系统 Python**。

- **`python-envs` 的优先级高于手动选择**——即使你在右下角手动选了正确的解释器，`python-envs` 扩展会按照自己的配置**重新设置**解释器，把你手动选的覆盖回去。

- **`python.defaultInterpreterPath` 只是默认回退值**——它仅在没有其他途径确定解释器时才会被使用。`python-envs` 已经"确定"了一个（错误的）解释器，所以这个设置完全不生效。

## 解决方案

把 `path` 改为 venv 实际所在的目录：

```json
{
    "python-envs.pythonProjects": [
        {
            "path": "herness-agent",
            "envManager": "ms-python.python:venv",
            "packageManager": "ms-python.python:pip"
        }
    ],
    "python.defaultInterpreterPath": "${workspaceFolder}/herness-agent/myenv/bin/python"
}
```

改完后 **`Cmd+Shift+P` → "Developer: Reload Window"** 重载窗口即可生效。如果还有问题，再执行 **`Cmd+Shift+P` → "Pylance: Restart Server"**。

## 关键总结

| 设置 | 作用 | 优先级 |
|---|---|---|
| `python-envs.pythonProjects` | Python Environments 扩展自动发现和管理 venv | **最高，会覆盖一切** |
| 右下角手动选择解释器 | 用户显式指定解释器 | 中，但会被 `python-envs` 覆盖 |
| `python.defaultInterpreterPath` | 没有人指定解释器时的最后回退 | **最低，仅当没有其他解释器选择时才生效** |

> **核心教训**：`python-envs.pythonProjects` 配置的 `path` 必须是 venv **实际所在的目录**（或是其父目录），扩展只会在该目录下按标准命名规则（`.venv`、`venv`）查找。如果找不到，它不会报错，而是静默回退到系统 Python——然后 Pylance 就开始报大量虚假的"无法解析导入"。
