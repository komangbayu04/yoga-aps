const { withDangerousMod } = require('@expo/config-plugins');
const path = require('path');
const fs = require('fs');

/**
 * Auto-generates android/local.properties with sdk.dir during prebuild.
 * Reads ANDROID_HOME env var; falls back to the standard Windows path.
 */
const withLocalProperties = (config) => {
  return withDangerousMod(config, [
    'android',
    (mod) => {
      const androidHome =
        process.env.ANDROID_HOME ||
        process.env.ANDROID_SDK_ROOT ||
        `C:\\Users\\${process.env.USERNAME || process.env.USER || 'User'}\\AppData\\Local\\Android\\Sdk`;

      const sdkDir = androidHome.replace(/\\/g, '\\\\');
      const content = `sdk.dir=${sdkDir}\n`;

      const localPropsPath = path.join(mod.modRequest.platformProjectRoot, 'local.properties');
      fs.writeFileSync(localPropsPath, content, 'utf8');

      return mod;
    },
  ]);
};

module.exports = withLocalProperties;
