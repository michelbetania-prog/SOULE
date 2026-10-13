// Nunca guardes HTML de Next como cache-first: podría pedir chunks de otro despliegue.
const CACHE="compinche-shell-v2";
const SHELL=["/","/manifest.webmanifest"];
const sameOrigin=request=>new URL(request.url).origin===self.location.origin;
const staticAsset=request=>{
  const path=new URL(request.url).pathname;
  return path.startsWith("/_next/static/")||path==="/manifest.webmanifest";
};
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  const {request}=event;
  if(request.method!=="GET"||!sameOrigin(request))return;
  if(request.mode==="navigate"){
    event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put("/",copy));return response;}).catch(()=>caches.match("/")));
    return;
  }
  if(staticAsset(request)) event.respondWith(caches.match(request).then(hit=>hit||fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return response;})));
});
