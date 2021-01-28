const cacheName ='v1';

const cacheAssets = [
    'index.html',
    'style.css',
    'about.html',
    'index.js'
];


self.addEventListener('install',async(ev) => {
    ev.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        cache.addAll(cacheAssets);
        return self.skipWaiting();
    })());
});



self.addEventListener('activate',async(ev) => {
    ev.waitUntil((async () => {
        const keys = await caches.keys();
        const targets = keys.filter(key => key !== cacheName);
        return Promise.all(targets.map(target => caches.delete(target)));
    })());

});



self.addEventListener('fetch',async(ev) => {
    ev.respondWith((async () =>{
        const hit = await caches.match(ev.request);
        //キャッシュがあれば返す
        if(hit){
            return hit;
        }
        //無ければ撮りに行く
        try{
            const res = await fetch(ev.request);
            const resClone = res.clone();
            const cache = await caches.open(cacheName);
            cache.put(ev.request, resClone);
            return res;
        }catch(error){
            return new Response(error);
        }
    })());   
});

