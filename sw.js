const C='tora-v2',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 e.respondWith(caches.open(C).then(c=>c.match(q,{ignoreSearch:true}).then(hit=>{
  const net=fetch(q).then(n=>{if(n.ok&&(new URL(q.url).origin===location.origin||/fonts\.(googleapis|gstatic)\.com/.test(q.url)))c.put(q,n.clone());return n}).catch(()=>hit||c.match('index.html'));
  return hit||net})))});
