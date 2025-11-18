#!/bin/bash
# React Native Directory Auto-Submit Pipeline
# This script automates the entire submission process to react-native-community/directory
# Prerequisites: git, gh (GitHub CLI), node
# Usage: bash submit-to-directory.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 React Native Directory Auto-Submit Pipeline${NC}"

# 1. Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v git &> /dev/null; then
  echo -e "${RED}✗ git not found. Please install git.${NC}"
  exit 1
fi

if ! command -v gh &> /dev/null; then
  echo -e "${RED}✗ gh (GitHub CLI) not found. Please install it from https://cli.github.com${NC}"
  exit 1
fi

if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ node not found. Please install Node.js.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ All prerequisites met${NC}"

# 2. Check GitHub authentication
echo -e "${YELLOW}Checking GitHub authentication...${NC}"

if ! gh auth status &> /dev/null; then
  echo -e "${RED}✗ Not authenticated with GitHub CLI.${NC}"
  echo "Run: gh auth login"
  exit 1
fi

GITHUB_USER=$(gh api user -q '.login')
echo -e "${GREEN}✓ Authenticated as: $GITHUB_USER${NC}"

# 3. Fork the repository
echo -e "${YELLOW}Checking if repository is already forked...${NC}"

FORK_URL="https://github.com/$GITHUB_USER/directory.git"

# Try to get fork info
if gh repo view "$GITHUB_USER/directory" &> /dev/null; then
  echo -e "${GREEN}✓ Fork already exists${NC}"
else
  echo -e "${YELLOW}Creating fork...${NC}"
  gh repo fork react-native-community/directory --clone=false
  echo -e "${GREEN}✓ Fork created${NC}"
fi

# 4. Setup working directory
WORK_DIR="/tmp/rn-directory-submission-$$"
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"

echo -e "${YELLOW}Working directory: $WORK_DIR${NC}"

# 5. Clone forked repository
echo -e "${YELLOW}Cloning your fork...${NC}"

if [ -d "directory" ]; then
  echo -e "${YELLOW}Directory already exists, pulling latest...${NC}"
  cd directory
  git fetch origin
  git checkout main || git checkout master
  git pull origin main || git pull origin master
else
  git clone "$FORK_URL" directory
  cd directory
fi

# 6. Create a new branch
BRANCH_NAME="add-react-native-otp-input-$(date +%s)"
echo -e "${YELLOW}Creating branch: $BRANCH_NAME${NC}"

git fetch origin
git checkout -b "$BRANCH_NAME" origin/main || git checkout -b "$BRANCH_NAME" origin/master

echo -e "${GREEN}✓ Branch created${NC}"

# 6.5 Configure Git identity
echo -e "${YELLOW}Configuring Git identity...${NC}"

git config user.email "github-actions[bot]@users.noreply.github.com"
git config user.name "github-actions[bot]"

echo -e "${GREEN}✓ Git identity configured${NC}"

# 7. Add the library entry
echo -e "${YELLOW}Adding library entry to react-native-libraries.json...${NC}"

# Use Node.js to safely add the entry
node << 'NODEJS_EOF'
const fs = require('fs');

const filePath = 'react-native-libraries.json';
const newEntry = {
  "githubUrl": "https://github.com/bhojaniasgar/react-native-otp-input",
  "npmPkg": "@bhojaniasgar/react-native-otp-input",
  "examples": ["https://github.com/bhojaniasgar/react-native-otp-input/tree/main/example"],
  "images": [],
  "ios": true,
  "android": true,
  "web": false,
  "expoGo": true,
  "newArchitecture": false
};

try {
  const raw = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(raw);
  
  if (!Array.isArray(json)) {
    throw new Error('File should contain an array');
  }
  
  const exists = json.some(item => 
    item.githubUrl && 
    item.githubUrl.toLowerCase() === newEntry.githubUrl.toLowerCase()
  );
  
  if (exists) {
    console.log('Entry already exists');
    process.exit(0);
  }
  
  json.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n');
  console.log('Entry added successfully');
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
}
NODEJS_EOF

echo -e "${GREEN}✓ Entry added${NC}"

# 8. Verify the file is valid JSON
echo -e "${YELLOW}Validating JSON...${NC}"
if ! node -e "require('./react-native-libraries.json')" 2>/dev/null; then
  echo -e "${RED}✗ Invalid JSON in react-native-libraries.json${NC}"
  exit 1
fi
echo -e "${GREEN}✓ JSON is valid${NC}"

# 9. Commit changes
echo -e "${YELLOW}Committing changes...${NC}"

git add react-native-libraries.json
git commit -m "Add @bhojaniasgar/react-native-otp-input

- GitHub: https://github.com/bhojaniasgar/react-native-otp-input
- npm: https://www.npmjs.com/package/@bhojaniasgar/react-native-otp-input
- iOS: ✓
- Android: ✓
- Expo Go: ✓
"

echo -e "${GREEN}✓ Changes committed${NC}"

# 10. Push to fork
echo -e "${YELLOW}Pushing to your fork...${NC}"

git push origin "$BRANCH_NAME"

echo -e "${GREEN}✓ Pushed to origin/$BRANCH_NAME${NC}"

# 11. Create Pull Request
echo -e "${YELLOW}Creating Pull Request...${NC}"

PR_BODY=$(cat <<'EOF'
Add @bhojaniasgar/react-native-otp-input

A fully customizable, responsive OTP (One-Time Password) input component for React Native.

## Details
- **GitHub**: https://github.com/bhojaniasgar/react-native-otp-input
- **npm**: https://www.npmjs.com/package/@bhojaniasgar/react-native-otp-input
- **License**: MIT

## Features
✅ Fully customizable styling
✅ Responsive design
✅ Auto-fill support (Android)
✅ TypeScript support
✅ Expo compatible
✅ Works on iOS and Android

## Compatibility
- iOS: ✓
- Android: ✓
- Expo Go: ✓
- Web: ✗
- New Architecture: Not tested

This PR adds the library entry to react-native-libraries.json following the submission guidelines.
EOF
)

PR_URL=$(gh pr create \
  --repo react-native-community/directory \
  --base main \
  --head "$GITHUB_USER:$BRANCH_NAME" \
  --title "Add @bhojaniasgar/react-native-otp-input" \
  --body "$PR_BODY" \
  --web)

echo -e "${GREEN}✓ Pull Request created${NC}"
echo -e "${GREEN}PR URL: $PR_URL${NC}"

# 12. Summary
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ SUBMISSION COMPLETE!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📊 Summary:"
echo "  Repository: react-native-community/directory"
echo "  Library: @bhojaniasgar/react-native-otp-input"
echo "  Fork: https://github.com/$GITHUB_USER/directory"
echo "  Branch: $BRANCH_NAME"
echo "  Working Dir: $WORK_DIR"
echo ""
echo "🔗 Next Steps:"
echo "  1. Review your PR at: $PR_URL"
echo "  2. Wait for maintainers to review"
echo "  3. Address any feedback if needed"
echo ""
echo -e "${GREEN}✓ Your package is now submitted to React Native Directory!${NC}"
