/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');

async function customStaleWhileRevalidate(event) {
    let promise = null;
    let cachedResponse = await getCache(event.request.clone());
    let fetchPromise = fetch(event.request.clone())
      .then((response) => {
        setCache(event.request.clone(), response.clone());
        return response;
      })
      .catch((err) => {
        console.error(err);
      });
    return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;    
} 

async function serializeResponse(response) {
    let serializedHeaders = {};
    for (var entry of response.headers.entries()) {
      serializedHeaders[entry[0]] = entry[1];
    }
    let serialized = {
      headers: serializedHeaders,
      status: response.status,
      statusText: response.statusText
    };
    serialized.body = await response.json();
    return serialized;
  }
  
  async function setCache(request, response) {
    var key, data;
    let body = await request.json();
    let id = CryptoJS.MD5(body.query).toString();
  
    var entry = {
      query: body.query,
      response: await serializeResponse(response),
      timestamp: Date.now()
    };
    idbKeyval.set(id, entry, store);
  }
  
  async function getCache(request) {
    let data;
    try {
      let body = await request.json();
      let id = CryptoJS.MD5(body.query).toString();
      data = await idbKeyval.get(id, store);
      if (!data) return null;
  
      // Check cache max age.
      let cacheControl = request.headers.get('Cache-Control');
      let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
      if (Date.now() - data.timestamp > maxAge * 1000) {
        console.log(`Cache expired. Load from API endpoint.`);
        return null;
      }
  
      console.log(`Load response from cache.`);
      return new Response(JSON.stringify(data.response.body), data.response);
    } catch (err) {
      return null;
    }
  }
  
  async function getPostKey(request) {
    let body = await request.json();
    return JSON.stringify(body);
  }

export default{
    customStaleWhileRevalidate
}