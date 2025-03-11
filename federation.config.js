const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'system-mfe',

  exposes: {
    './Component': './src/app/pages/system/system.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto', transient: true, }),
    "@primeng/themes/types": {
      transient: true,
      packageInfo: {
        entryPoint: "node_modules/@primeng/themes/index.mjs",
        version: "19.0.5",
        esm: true,
      },
    },
    "@primeng/themes/aura": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
      transient: true,
      includeSecondaries: false,
      build: "separate",
    },
    '@primeng/themes/aura/accordion': {
      packageInfo: {
        entryPoint: 'node_modules/@primeng/themes/aura/accordion/index.mjs',
        version: '19.0.5',
        esm: true
      }
    },
    '@primeng/themes/aura/autocomplete': {
      packageInfo: {
        entryPoint: 'node_modules/@primeng/themes/aura/autocomplete/index.mjs',
        version: '19.0.5',
        esm: true
      }
    },
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
  
});
