/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js",
  "https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js",
  "/precache-manifest.f494d983f9b28d5913fe5a5501d724e9.js"
);

workbox.core.setCacheNameDetails({prefix: "todo"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https:\/\/fonts.googleapis.com\//, new workbox.strategies.StaleWhileRevalidate({ plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/cdn.jsdelivr.net\//, new workbox.strategies.StaleWhileRevalidate({ plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/todo-api-parse.mpk.dynu.net\/parse\//, (event) => {
            //const store = new idbKeyval.Store('API-Cache', 'PostResponses');
            const reqUrl = 'https://todo-api-parse.mpk.dynu.net/parse'
            const customStaleWhileRevalidate = async (event) => {
              let reqClone = event.request.clone()
              let reqId = CryptoJS.MD5(await reqClone.text()).toString();
              let cachedResponse = await getCache(reqId);
              if (cachedResponse) {
                event.request.url = '/'+reqId
                event.request.method = 'GET'
              }
              let fetchResponse = await fetch(event.request.clone()).catch( () => {
                console.log("App is offline")
                return false
              })
              if (fetchResponse) {
                console.log("Updating cache")
                setCache(event.request.clone(),fetchResponse)
              }
              return cachedResponse ? cachedResponse : fetchResponse
            } 

             const serializeResponse = async(response) => {
                let serializedHeaders = {};
                for (let entry of response.headers.entries()) {
                  serializedHeaders[entry[0]] = entry[1];
                }
                let serialized = {
                  headers: serializedHeaders,
                  status: response.status,
                  statusText: response.statusText
                };
                serialized.body = await response.text();
                return serialized;
              }
              
              const setCache = async (request, response) => {
                
                let body = await request.text();
                let id = CryptoJS.MD5(body).toString();
                console.log("[SET CACHE] Setting cache for request: " + id)
                // let entry = {
                //   // query: body,
                //   response: await serializeResponse(response),
                //   timestamp: Date.now()
                // };
                // idbKeyval.set(id, entry, store);
                caches.open('api-cache')
                  .then(cache => {
                    cache.put(id, response)
                  })
              }
              
              const getCache = async (id) => {
                console.log("[GET CACHE] Checking cache")
                // let data;
                // let body = await request.text();
                // let id = CryptoJS.MD5(body).toString();
                // data = await idbKeyval.get(id, store);
                // if (data) console.log("[GET CACHE] CACHE HIT!")
                // if (!data) return false;
                return caches.match(id)
                  .then(response => {
                    console.log("cache hit!")
                    return response
                    // return new Response(data.response.body,{
                    //   headers: data.response.headers,
                    //   status: data.response.status,
                    //   statusText: data.response.statusText
                    // })
                  })
                  .catch(e => {
                    console.log("no cache hit")
                    return false
                  } ) 
            
                // Check cache max age.
                // let cacheControl = request.headers.get('Cache-Control');
                // let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
                // if (Date.now() - data.timestamp > maxAge * 1000) {
                //   console.log(`[GET CACHE] Cache expired. Load from API endpoint.`);
                //   return false;
                // }           
              }
              customStaleWhileRevalidate(event)
          }, 'POST');
