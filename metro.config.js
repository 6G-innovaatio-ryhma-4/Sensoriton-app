const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add 3D model formats as bundled assets so Metro can resolve them via import/require
config.resolver.assetExts.push('glb', 'gltf', 'fbx', 'obj', 'stl', 'ply', 'las');

module.exports = config;
