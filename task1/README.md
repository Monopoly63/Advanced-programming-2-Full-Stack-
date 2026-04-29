# Task 1 — Git Basics: A Comprehensive Guide

> A professional, hands-on reference for Git — the distributed version control
> system that powers modern software collaboration.

---

## Table of Contents

1. [What is Git and Why it Matters](#what-is-git-and-why-it-matters)
2. [Initializing and Cloning Repositories](#initializing-and-cloning-repositories)
3. [The Core Workflow: status, add, commit](#the-core-workflow-status-add-commit)
4. [Synchronizing With Remotes: push, pull, fetch](#synchronizing-with-remotes-push-pull-fetch)
5. [Branching and Merging](#branching-and-merging)
6. [Remote Management](#remote-management)
7. [Undoing Changes: reset, revert, checkout](#undoing-changes-reset-revert-checkout)
8. [.gitignore Best Practices](#gitignore-best-practices)
9. [Real-World Workflow: Feature Branch Workflow](#real-world-workflow-feature-branch-workflow)
10. [Common Pitfalls & Tips](#common-pitfalls--tips)

---

## What is Git and Why it Matters

**Git** is a free, open-source **distributed version control system (DVCS)**
created by Linus Torvalds in 2005. Unlike centralized VCS tools (such as SVN),
every Git clone is a **full repository with complete history**, enabling fast
offline work, robust branching, and powerful collaboration.

### Why Git matters

- **History you can trust** — every change is tracked with author, timestamp,
  and a cryptographic hash (SHA-1/SHA-256).
- **Branching is cheap and fast** — encouraging experimentation without fear.
- **Distributed by design** — no single point of failure; every developer has
  a full backup.
- **The foundation of modern collaboration** — platforms like GitHub, GitLab,
  and Bitbucket all build on Git.

### Configure Git (one-time setup)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"   # or vim, nano, etc.
```

---

## Initializing and Cloning Repositories

### `git init` — Create a new repository

```bash
mkdir my-project
cd my-project
git init
```

This creates a hidden `.git/` directory that stores all repository metadata.

### `git clone` — Copy a remote repository

```bash
# Clone via HTTPS
git clone https://github.com/user/repo.git

# Clone via SSH (recommended for daily work)
git clone git@github.com:user/repo.git

# Clone into a specific folder
git clone https://github.com/user/repo.git my-folder
```

---

## The Core Workflow: status, add, commit

### `git status` — Inspect the working tree

```bash
git status
git status -s   # short format
```

### `git add` — Stage changes for the next commit

```bash
git add file.txt          # add a single file
git add src/              # add a folder
git add .                 # add all changes in the current directory
git add -p                # interactively pick hunks to stage
```

### `git commit` — Record a snapshot

```bash
git commit -m "feat: add user login endpoint"
git commit -am "fix: correct validation typo"   # add tracked files + commit
git commit --amend                               # edit the last commit
```

**Good commit messages** follow the [Conventional Commits](https://www.conventionalcommits.org/)
style: `type(scope): short imperative summary`.

---

## Synchronizing With Remotes: push, pull, fetch

### `git push` — Send local commits to a remote

```bash
git push origin main
git push -u origin feature/login    # set upstream on first push
git push --force-with-lease         # safer force push
```

### `git pull` — Fetch + merge from the remote

```bash
git pull origin main
git pull --rebase origin main       # rebase local commits on top of remote
```

### `git fetch` — Download changes without merging

```bash
git fetch origin
git fetch --all --prune             # fetch all remotes, remove stale branches
```

---

## Branching and Merging

### Creating and switching branches

```bash
git branch                          # list local branches
git branch -a                       # list local + remote branches
git checkout -b feature/login       # create and switch to a new branch
git switch -c feature/login         # modern alternative (Git 2.23+)
git switch main                     # switch to an existing branch
```

### Merging branches

```bash
git switch main
git merge feature/login             # merge the feature branch into main
git merge --no-ff feature/login     # force a merge commit (keeps history)
```

### Deleting branches

```bash
git branch -d feature/login         # delete if fully merged
git branch -D feature/login         # force delete
git push origin --delete feature/login   # delete remote branch
```

---

## Remote Management

```bash
git remote -v                                   # list remotes
git remote add origin git@github.com:u/r.git    # add a remote
git remote rename origin upstream               # rename a remote
git remote remove upstream                      # remove a remote
git remote set-url origin git@github.com:u/r2.git
```

---

## Undoing Changes: reset, revert, checkout

### `git checkout --` — Discard changes in the working tree

```bash
git checkout -- file.txt            # discard unstaged changes
git restore file.txt                # modern alternative
```

### `git reset` — Move HEAD and (optionally) the index/working tree

```bash
git reset HEAD file.txt             # unstage a file
git reset --soft HEAD~1             # undo last commit, keep changes staged
git reset --mixed HEAD~1            # undo last commit, unstage changes (default)
git reset --hard HEAD~1             # undo last commit, DISCARD changes (dangerous)
```

### `git revert` — Create a new commit that undoes a previous one (safe for shared history)

```bash
git revert <commit-sha>
git revert HEAD                     # revert the most recent commit
```

> **Rule of thumb:** use `revert` on shared branches, `reset` only on local work.

---

## .gitignore Best Practices

A `.gitignore` file tells Git which files to **never** track. Example:

```gitignore
# ---------- Dependencies ----------
node_modules/
vendor/
__pycache__/

# ---------- Build output ----------
dist/
build/
out/
*.class
*.o
*.exe

# ---------- Environment & secrets ----------
.env
.env.local
*.pem

# ---------- IDE / OS ----------
.vscode/
.idea/
.DS_Store
Thumbs.db

# ---------- Logs ----------
*.log
npm-debug.log*
```

### Best practices

- Commit a `.gitignore` **at the root** of the repo as early as possible.
- Use [gitignore.io](https://www.toptal.com/developers/gitignore) to generate a
  template per language/IDE.
- Never commit secrets — use `.env` + environment variables instead.
- Use per-folder `.gitignore` files for large monorepos.

---

## Real-World Workflow: Feature Branch Workflow

This is the most common professional workflow used across teams.

### 1. Start from an up-to-date `main`

```bash
git switch main
git pull origin main
```

### 2. Create a feature branch

```bash
git switch -c feature/user-authentication
```

### 3. Work in small, focused commits

```bash
# make changes...
git status
git add src/auth/
git commit -m "feat(auth): add JWT token generation"

# more changes...
git add tests/auth/
git commit -m "test(auth): cover token expiration edge cases"
```

### 4. Keep your branch in sync with `main`

```bash
git fetch origin
git rebase origin/main          # preferred — keeps history linear
# or: git merge origin/main
```

### 5. Push the branch and open a Pull Request

```bash
git push -u origin feature/user-authentication
```

Then open a PR on GitHub/GitLab, request a review, and iterate on feedback.

### 6. After approval, merge and clean up

```bash
git switch main
git pull origin main
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

---

## Common Pitfalls & Tips

- ❌ **Don't `git push --force` on shared branches.** Use `--force-with-lease`.
- ✅ **Commit early, commit often.** Small commits = easy reviews and reverts.
- ✅ **Write meaningful commit messages.** Future-you will thank you.
- ✅ **Pull before you push** to avoid unnecessary merge conflicts.
- ✅ **Use `git stash`** to temporarily shelve uncommitted work:
  ```bash
  git stash
  git stash pop
  ```
- ✅ **Inspect history visually:**
  ```bash
  git log --oneline --graph --decorate --all
  ```

---

## Summary

Git is the backbone of professional software development. Mastering its core
workflow (`add` → `commit` → `push`), branching model, and undo operations
unlocks safe experimentation, clean history, and smooth team collaboration.

> **Author:** Monopoly63 — Advanced Programming 2