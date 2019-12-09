/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    workboxPluginMode:'GenerateSW',
    swDest: '/service-worker.js',
    include: [/\.html$/, /\.js$/, /\.xml$/, /\.css$/, /\.png$/, /\.json$/],
    clientsClaim: true,
    skipWaiting: true,
    workboxOptions: {
      importScripts: [
        'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js',
        'https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js'
      ],
      runtimeCaching: [
        {
          //Fonts
          urlPattern: new RegExp('^https://fonts\.googleapis\.com/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          //Icon Font
          urlPattern: new RegExp('^https://cdn\.jsdelivr\.net/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ],
    }
  }
}