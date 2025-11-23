const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Get the project root (parent directory)
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

// Watch both the project and the workspace
config.watchFolders = [workspaceRoot];

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Prevent duplicate React packages by blocking parent's node_modules/react
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
config.resolver.blockList = [
  new RegExp(`${escapeRegex(workspaceRoot)}/node_modules/react/`),
  new RegExp(`${escapeRegex(workspaceRoot)}/node_modules/react-dom/`),
  new RegExp(`${escapeRegex(workspaceRoot)}/node_modules/react-native/`),
];

module.exports = config;
