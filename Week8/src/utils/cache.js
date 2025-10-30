import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 600 }); // cache for 10 minutes

export const getCache = (key) => cache.get(key);
export const setCache = (key, data) => cache.set(key, data);
