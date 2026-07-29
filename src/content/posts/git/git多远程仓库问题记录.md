从你的 `git remote -v` 输出可以看到，你成功配置了**两个 push 目标**：

```text
origin  http://192.168.168.153:3003/... (fetch)   # 拉取来源
origin  https://github.com/...         (push)      # 推送目标1
origin  http://192.168.168.153:3003/... (push)     # 推送目标2
```

推送失败的原因是：**Git 按顺序推送时，先推送到 Gitea（局域网），但认证凭据没通过**（`remote: Unauthorized`）。而那个 `.sock` 错误是 VSCode 的 Git 凭证助手找不到，属于次要问题。

---

### 问题核心：Gitea 推送需要认证

你的 Gitea 仓库（`http://192.168.168.153:3003`）**不是公开仓库**，推代码需要用户名和密码（或 Token）。Git 没有存储这些凭据，所以认证失败。

---

### 解决方案（按推荐顺序）

#### 方案一：为 Gitea 单独存储用户名密码（最简单）

在 Mac 终端执行一次手动推送，让 Git 记住凭据：

```bash
git push http://你的Gitea用户名:你的密码@192.168.168.153:3003/your_name/my-first-electron.git main
```

**但注意**：如果密码包含特殊字符（如 `@` `#` `%`），需要 URL 编码，容易出错。更推荐使用 **Git 凭据助手**：

```bash
# 让 Git 记住明文密码（macOS 默认用 osxkeychain 或 plaintext）
git config --global credential.helper store
# 然后执行一次推送，输入用户名和密码，以后就记住了
git push
```

输入一次用户名（例如 `zhangsan`）和密码后，下次就不再提示。

---

#### 方案二：使用 Gitea 的 Access Token（更安全，推荐）

Gitea 支持用 Token 替代密码，更安全且不需要明文密码。

1. 在浏览器打开 `http://192.168.168.153:3003/user/settings/applications`（右上角头像 > 设置 > 应用）。
2. 点击 **“生成令牌”**，给它起个名字（如 `git-push`），权限勾选 `write:repository`，然后生成并复制 Token（只显示一次）。
3. 在 Mac 终端执行：
   ```bash
   git push http://your_name:你的Token@192.168.168.153:3003/your_name/my-first-electron.git main
   ```
   或者用 Git 凭据助手记住它：
   ```bash
   git config --global credential.helper store
   # 然后第一次推送时，用户名填 zjlwyl，密码填 Token（注意不是登录密码）
   git push
   ```

---

#### 方案三：调整推送顺序，先推 GitHub（跳过 Gitea 认证）

如果你不介意每次先推 GitHub 再推 Gitea，可以**调整远程仓库的添加顺序**：

```bash
# 删除当前所有的 push 目标
git remote set-url --delete --push origin http://192.168.168.153:3003/your_name/my-first-electron.git
git remote set-url --delete --push origin https://github.com/your_name/my-first-electron.git

# 重新添加，先加 GitHub（它优先通过）
git remote set-url --add --push origin https://github.com/your_name/my-first-electron.git
git remote set-url --add --push origin http://192.168.168.153:3003/your_name/my-first-electron.git
```

这样 `git push` 会先推 GitHub（如果认证过），再推 Gitea。但 Gitea 认证失败时仍会停在第二步，你仍需解决凭据问题。

---

#### 方案四：分离两个远程（手动推送）

如果只想推送其中一个，可以给每个远程独立命名：

```bash
git remote add gitea http://192.168.168.153:3003/your_name/my-first-electron.git
git remote add github https://github.com/your_name/my-first-electron.git
```

然后按需推送：
```bash
git push github main    # 只推 GitHub
git push gitea main     # 只推 Gitea（输入密码）
```

---

### 关于那个 `.sock` 错误

这个错误是因为你在 **VSCode 的集成终端**里执行 `git push`，VSCode 尝试用它的 Git 凭证助手（`vscode-git`）去拿密码，但助手没启动或崩溃了。

**解决方法**：
- 打开 **Mac 自带的“终端”（Terminal）**，`cd` 到项目目录再执行 `git push`，就不会有 `.sock` 错误了。
- 或者在 VSCode 设置中禁用它的 Git 凭证助手：
  ```bash
  git config --global --unset credential.helper
  git config --global credential.helper store   # 改用系统自带的
  ```

---

### 最终建议

1. **优先用方案二（Token）**，一次配置，永久有效。
2. 按照方案二配置好 Gitea 的 Token 后，执行 `git push`，输入用户名和 Token，后续就不再需要认证了。
3. 同时推送到两个仓库时，Git 会先推 Gitea，再推 GitHub。只要 Gitea 凭据对了，GitHub 凭据通常也在 `osxkeychain` 里，就会一路绿灯。

配置完成后，再次执行 `git push`，应该会看到类似这样的输出：
```text
Enumerating objects: 5, done.
...
To http://192.168.168.153:3003/your_name/my-first-electron.git
   a1b2c3d..e4f5g6h  main -> main
To https://github.com/your_name/my-first-electron.git
   a1b2c3d..e4f5g6h  main -> main
Everything up-to-date
```

如果 Gitea 的 Token 配置后仍失败，请把执行 `git push` 后的完整报错贴出来，我再帮你深入排查。