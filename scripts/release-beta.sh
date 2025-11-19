#!/bin/bash

# Beta Release Script
# This script helps you publish a beta release

set -e

echo "🧪 Beta Release Script"
echo "====================="
echo ""

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

if [[ "$CURRENT_BRANCH" != "beta" && "$CURRENT_BRANCH" != "develop" ]]; then
    echo "⚠️  Warning: You're not on 'beta' or 'develop' branch"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes"
    git status -s
    read -p "Commit changes first? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " COMMIT_MSG
        git add .
        git commit -m "$COMMIT_MSG"
    fi
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📦 Current version: $CURRENT_VERSION"

# Bump version
echo ""
echo "🔢 Bumping version..."
npm run version:beta

NEW_VERSION=$(node -p "require('./package.json').version")
echo "✨ New version: $NEW_VERSION"

# Run tests
echo ""
echo "🧪 Running tests..."
npm run lint
npm run typecheck

# Build
echo ""
echo "🔨 Building package..."
npm run build

# Confirm publish
echo ""
echo "📦 Ready to publish:"
echo "   Package: @bhojaniasgar/react-native-otp-input"
echo "   Version: $NEW_VERSION"
echo "   Tag: beta"
echo ""
read -p "Publish to NPM? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Publish cancelled"
    exit 1
fi

# Publish
echo ""
echo "🚀 Publishing to NPM..."
npm publish --tag beta --access public

# Push to git
echo ""
echo "📤 Pushing to git..."
git push origin $CURRENT_BRANCH
git tag -a "v$NEW_VERSION" -m "Beta Release v$NEW_VERSION"
git push origin "v$NEW_VERSION"

echo ""
echo "✅ Beta release published successfully!"
echo ""
echo "📥 Users can install with:"
echo "   npm install @bhojaniasgar/react-native-otp-input@beta"
echo "   npm install @bhojaniasgar/react-native-otp-input@$NEW_VERSION"
echo ""
echo "🔗 View on NPM:"
echo "   https://www.npmjs.com/package/@bhojaniasgar/react-native-otp-input/v/$NEW_VERSION"
