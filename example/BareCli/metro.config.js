const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
    ],
    extraNodeModules: {
      '@bhojaniasgar/react-native-otp-input': path.resolve(workspaceRoot, 'src'),
      // Force React and React Native to resolve from example app only
      'react': path.resolve(projectRoot, 'node_modules/react'),
      'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
    },
    // Block resolution from workspace node_modules to prevent duplicate React
    blockList: [
      new RegExp(`${workspaceRoot}/node_modules/react/`),
      new RegExp(`${workspaceRoot}/node_modules/react-native/`),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
