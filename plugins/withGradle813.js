const { withDangerousMod } = require('@expo/config-plugins');
const path = require('path');
const fs = require('fs');

/**
 * Patches gradle-wrapper.properties to Gradle 8.13 during prebuild.
 * Required because:
 *   - AGP (used by React Native) requires Gradle >= 8.13
 *   - Gradle 9.x removed JvmVendorSpec.IBM_SEMERU which RNGP still references
 */
const withGradle813 = (config) => {
  return withDangerousMod(config, [
    'android',
    (mod) => {
      const wrapperPath = path.join(
        mod.modRequest.platformProjectRoot,
        'gradle',
        'wrapper',
        'gradle-wrapper.properties'
      );

      if (fs.existsSync(wrapperPath)) {
        let content = fs.readFileSync(wrapperPath, 'utf8');
        content = content.replace(
          /distributionUrl=.*gradle-.*\.zip/,
          'distributionUrl=https\\://services.gradle.org/distributions/gradle-8.13-bin.zip'
        );
        fs.writeFileSync(wrapperPath, content, 'utf8');
      }

      return mod;
    },
  ]);
};

module.exports = withGradle813;
