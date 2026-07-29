Git 允许一个本地仓库关联多个远程仓库，并且支持用**一条命令**按顺序推送到多个地址。实现方式主要有两种，你可以根据习惯选择：

### 方案一：为同一个远程名（如 origin）设置多个推送地址（最推荐）
这样配置后，你每次执行 `git push origin`（或直接 `git push`），代码就会**自动依次推送到这两个仓库**，非常省事。

**操作步骤（假设你当前的远程仓库叫 `origin`，地址是 A，想增加地址 B）：**

1. **查看当前远程地址**（记下地址 A）：
   ```bash
   git remote -v
   ```
   > 输出示例：`origin  https://github.com/user/repo.git (fetch)` 和 `(push)`

2. **重新设置推送目标**：
   由于 Git 默认 `push` 和 `fetch` 指向同一个地址，我们需要单独覆盖 `push` 的地址列表。

   ```bash
   # 1. 先把原有的 A 地址添加为推送目标
   git remote set-url --add --push origin <地址A>

   # 2. 再把新的 B 地址添加为推送目标
   git remote set-url --add --push origin <地址B>
   ```

3. **验证配置**：
   ```bash
   git remote -v
   ```
   此时你会看到：
   ```text
   origin  <地址A> (fetch)    # 拉取依然从 A 拉
   origin  <地址A> (push)     # 推送包含 A
   origin  <地址B> (push)     # 推送包含 B
   ```

4. **日常使用**：
   像往常一样执行 `git push`，Git 会**按顺序**先将代码推送到 A，再推送到 B。

---


### 方案二：保留两个独立的远程名（手动控制）
如果你不希望每次 push 都推两个，而是想按需推送（比如只推给 GitHub，或只推给 Gitee），可以保留两个名字。

**操作步骤：**

1. **添加第二个远程仓库**（假设第一个叫 `origin`）：
   ```bash
   git remote add gitee <地址B>   # 把 gitee 换成你喜欢的名字
   ```

2. **推送到特定仓库**：
   ```bash
   git push origin main    # 只推送到第一个
   git push gitee main     # 只推送到第二个
   ```

3. **一次性推送到所有远程（如果你想让一条命令搞定）**：
   虽然 Git 没有内置 `push --all-remotes`，但你可以利用 Git 的 `remote` 分组功能：
   ```bash
   # 创建一个名为 all 的远程组（先添加一个占位地址，再添加第二个）
   git remote add all <地址A>
   git remote set-url --add --push all <地址B>
   
   # 之后执行下面这条命令，就能一次性推送到 A 和 B
   git push all main
   ```

---

### ⚠️ 注意事项（很重要）

1. **权限一致性**：如果你用 HTTPS 协议，请确保两个仓库的账号密码/Token 都有写入权限。如果某个仓库推送失败（如 Token 过期），Git 会停止后续推送并报错，你需要解决失败后重新执行 `git push`。
2. **分支同步**：上述操作只会推送当前分支。如果你需要同步所有分支和标签，可以在 push 时加上 `--all` 和 `--tags` 参数。
3. **拉取（Pull）来源**：请留意方案一中的 `fetch` 地址，它默认只指向地址 A。如果你想从两个仓库都拉取更新，通常不建议这样做（容易产生冲突），维护一个主源（A）作为 fetch 源是更稳妥的做法。

**强烈推荐方案一**，配置一次，之后 `git push` 完全不改变习惯，省心省力。如果你要添加的是 Gitee 和 GitHub 的组合，目前这个配置是行业内最通用的做法。