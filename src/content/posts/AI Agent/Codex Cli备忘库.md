# Codex CLI 备忘库

## codex completion — 生成 shell 补全脚本

生成指定 shell 的补全脚本。

### 用法

```bash
codex completion [OPTIONS] [SHELL]
```

### 参数

`[SHELL]`：要生成补全脚本的 shell。

默认值：`bash`

可选值：`bash`、`elvish`、`fish`、`powershell`、`zsh`

### 常用示例

```bash
# 为 zsh 生成补全脚本
codex completion zsh

# 为 bash 生成补全脚本
codex completion bash

# 为 fish 生成补全脚本
codex completion fish

# 为 powershell 生成补全脚本
codex completion powershell
```

### 选项

| 选项 | 说明 |
| --- | --- |
| `-c, --config <key=value>` | 覆盖通常从 `~/.codex/config.toml` 加载的配置值。使用点分路径（`foo.bar.baz`）覆盖嵌套值；`value` 部分按 TOML 解析，失败则按原始字符串处理。示例：`-c model="o3"`、`-c 'sandbox_permissions=["disk-full-read-access"]'`、`-c shell_environment_policy.inherit=all` |
| `--enable <FEATURE>` | 启用某项功能（可重复），等价于 `-c features.<name>=true` |
| `--disable <FEATURE>` | 禁用某项功能（可重复），等价于 `-c features.<name>=false` |
| `-h, --help` | 打印帮助（使用 `-h` 查看摘要） |
