// Try to get data from the cache, but fall back to fetching it live.
export async function getData(url) {
  const cacheVersion = 1;
  const cacheName = `myapp-${cacheVersion}`;
  let cachedData = await getCachedData(cacheName, url);

  if (cachedData) {
    console.log("Retrieved cached data for ", url);
    return cachedData;
  }

  console.log("Fetching fresh data for ", url);

  const cacheStorage = await caches.open(cacheName);
  await cacheStorage.add(url);
  cachedData = await getCachedData(cacheName, url);
  await deleteOldCaches(cacheName);

  return cachedData;
}

// Get data from the cache.
async function getCachedData(cacheName, url) {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return cachedResponse.json();
}

// Delete any old caches to respect user's disk space.
async function deleteOldCaches(currentCache) {
  const keys = await caches.keys();

  keys.forEach(key => {
    const isOurCache = key.startsWith("myapp-");
    if (currentCache === key || !isOurCache) {
      return;
    }
    caches.delete(key);
  });  
}