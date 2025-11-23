# Contributing Guide

## Branch Naming Convention

All branches must follow this naming pattern:

```
type(scope)-description
```

### Valid Types
- `fix` - Bug fixes
- `feat` - New features
- `chore` - Maintenance tasks
- `docs` - Documentation changes
- `style` - Code style/formatting
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `perf` - Performance improvements

### Examples
```bash
fix(pod)-pod-issue
feat(auth)-login-feature
chore(deps)-update-packages
refactor(ui)-button-component
docs(readme)-update-installation
test(otp)-add-unit-tests
```

## Creating a New Branch

### Option 1: Using the Helper Script (Recommended)
```bash
npm run branch:create
```

This interactive script will guide you through creating a properly named branch.

### Option 2: Manual Creation
```bash
git checkout -b fix(pod)-pod-issue
```

## Workflow

1. **Create a branch** from `main` with proper naming
   ```bash
   npm run branch:create
   ```

2. **Make your changes** and commit them
   ```bash
   git add .
   git commit -m "fix(pod): resolve pod installation issue"
   ```

3. **Push your branch**
   ```bash
   git push origin fix(pod)-pod-issue
   ```

4. **Create a Pull Request** on GitHub
   - The branch will be automatically deleted after merge
   - At least 1 approval is required
   - Only the repository owner can merge PRs

## Branch Protection Rules

The `main` branch is protected with the following rules:
- ✅ No direct pushes allowed
- ✅ Pull requests required
- ✅ At least 1 approval required
- ✅ No force pushes
- ✅ Branches auto-delete after merge

## Git Hooks

This repository uses git hooks to enforce branch naming:
- **pre-push**: Validates branch name before pushing

Hooks are automatically set up when you run `npm install` or `npm run setup:hooks`.

## Questions?

If you have any questions about the contribution process, please open an issue.
