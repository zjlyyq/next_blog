# Codex CLI

如果未指定子命令，选项将传递给交互式 CLI。

用法：`codex [OPTIONS] [PROMPT]`
       `codex [OPTIONS] <COMMAND> [ARGS]`

## 命令

| 命令 | 说明 |
| --- | --- |
| `exec` | 以非交互方式运行 Codex（别名：`e`） |
| `review` | 以非交互方式运行代码审查 |
| `login` | 管理登录 |
| `logout` | 删除已存储的身份验证凭据 |
| `mcp` | 管理 Codex 的外部 MCP 服务器 |
| `plugin` | 管理 Codex 插件 |
| `mcp-server` | 将 Codex 作为 MCP 服务器（stdio）启动 |
| `app-server` | [实验性] 运行应用服务器或相关工具 |
| `remote-control` | [实验性] 管理启用了远程控制的应用服务器守护进程 |
| `app` | 启动桌面应用（若缺失则打开应用安装程序） |
| `completion` | 生成 shell 补全脚本 |
| `update` | 将 Codex 更新到最新版本 |
| `doctor` | 诊断本地 Codex 安装、配置、身份验证和运行时健康状况 |
| `sandbox` | 在 Codex 提供的沙箱中运行命令 |
| `debug` | 调试工具 |
| `apply` | 将 Codex agent 生成的最新 diff 以 `git apply` 方式应用到本地工作树（别名：`a`） |
| `resume` | 恢复之前的交互式会话（默认使用选择器；使用 `--last` 继续最近的一次） |
| `archive` | 按 ID 或会话名称归档已保存的会话 |
| `delete` | 按 ID 或会话名称永久删除已保存的会话 |
| `unarchive` | 按 ID 或会话名称取消归档已保存的会话 |
| `fork` | 派生之前的交互式会话（默认使用选择器；使用 `--last` 派生最近的一次） |
| `cloud` | [实验性] 浏览 Codex Cloud 中的任务并在本地应用更改 |
| `exec-server` | [实验性] 运行独立的 exec-server 服务 |
| `features` | 检查功能开关 |
| `help` | 打印此消息或指定子命令的帮助 |

## 参数

`[PROMPT]`

用于启动会话的可选用户提示。

## 选项

`-c, --config <key=value>`

覆盖通常从 `~/.codex/config.toml` 加载的配置值。使用点分路径（`foo.bar.baz`）覆盖嵌套值。`value` 部分按 TOML 解析；如果解析 TOML 失败，则使用原始字符串作为字面量。

示例：

- `-c model="o3"`
- `-c 'sandbox_permissions=["disk-full-read-access"]'`
- `-c shell_environment_policy.inherit=all`

`--enable <FEATURE>`

启用某项功能（可重复）。等价于 `-c features.<name>=true`。

`--disable <FEATURE>`

禁用某项功能（可重复）。等价于 `-c features.<name>=false`。

`--remote <ADDR>`

将 TUI 连接到远程应用服务器端点。

接受的形式：`ws://host:port`、`wss://host:port`、`unix://` 或 `unix://PATH`。

`--remote-auth-token-env <ENV_VAR>`

包含要发送到远程应用服务器 websocket 的 bearer 令牌的环境变量的名称。

`--strict-config`

当 `config.toml` 包含此版本 Codex 无法识别的字段时报错。

`-i, --image <FILE>...`

附加到初始提示的可选图像。

`-m, --model <MODEL>`

agent 应使用的模型。

`--oss`

使用开源提供商。

`--local-provider <OSS_PROVIDER>`

指定要使用的本地提供商（`lmstudio` 或 `ollama`）。如果未与 `--oss` 一起指定，则使用配置默认值或显示选择。

`-p, --profile <CONFIG_PROFILE_V2>`

将 `$CODEX_HOME/<name>.config.toml` 叠加在基础用户配置之上。

`-s, --sandbox <SANDBOX_MODE>`

选择执行模型生成的 shell 命令时使用的沙箱策略。

可选值：`read-only`、`workspace-write`、`danger-full-access`。

`--dangerously-bypass-approvals-and-sandbox`

跳过所有确认提示并在无沙箱的情况下执行命令。**极其危险**。仅用于在外部已沙箱化的环境中运行。

`--dangerously-bypass-hook-trust`

在本次调用中运行已启用的钩子，而无需持久化的钩子信任。**危险**。仅适用于已经审查过钩子来源的自动化场景。

`-C, --cd <DIR>`

指示 agent 将指定目录用作工作根目录。

`--add-dir <DIR>`

除了主工作区之外，额外可写的目录。

`-a, --ask-for-approval <APPROVAL_POLICY>`

配置模型在执行命令前何时需要人工批准。

可能的值：

- `untrusted`：仅运行"受信任"的命令（例如 `ls`、`cat`、`sed`），不询问用户批准。如果模型提议的命令不在"受信任"集合中，将升级给用户处理。
- `on-request`：模型决定何时请求用户批准。
- `never`：从不请求用户批准。执行失败会立即返回给模型。

`--search`

启用实时网络搜索。启用后，模型可使用原生 Responses `web_search` 工具（无需逐次批准）。

`--no-alt-screen`

禁用备用屏幕模式，以内联模式运行 TUI，保留终端回滚历史。

`-h, --help`

打印帮助（使用 `-h` 查看摘要）。

`-V, --version`

打印版本。
