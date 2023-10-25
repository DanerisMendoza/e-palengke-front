const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Your App Name',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // You can add more PWA configuration options here
  }
})