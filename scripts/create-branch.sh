#!/bin/bash

# Helper script to create properly named branches
# Usage: npm run branch:create

echo "🌿 Create a new branch"
echo ""
echo "Select branch type:"
echo "1) fix      - Bug fix"
echo "2) feat     - New feature"
echo "3) chore    - Maintenance task"
echo "4) docs     - Documentation"
echo "5) style    - Code style/formatting"
echo "6) refactor - Code refactoring"
echo "7) test     - Adding tests"
echo "8) perf     - Performance improvement"
echo ""
read -p "Enter number (1-8): " type_num

case $type_num in
    1) type="fix";;
    2) type="feat";;
    3) type="chore";;
    4) type="docs";;
    5) type="style";;
    6) type="refactor";;
    7) type="test";;
    8) type="perf";;
    *) echo "❌ Invalid selection"; exit 1;;
esac

echo ""
read -p "Enter scope (e.g., pod, auth, ui): " scope
echo ""
read -p "Enter description (use kebab-case, e.g., pod-issue): " description

# Validate inputs
if [ -z "$scope" ] || [ -z "$description" ]; then
    echo "❌ Scope and description are required"
    exit 1
fi

# Convert to lowercase and replace spaces with hyphens
scope=$(echo "$scope" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
description=$(echo "$description" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

branch_name="${type}(${scope})-${description}"

echo ""
echo "Creating branch: $branch_name"
git checkout -b "$branch_name"

if [ $? -eq 0 ]; then
    echo "✅ Branch created successfully: $branch_name"
else
    echo "❌ Failed to create branch"
    exit 1
fi
