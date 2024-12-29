import Cache from "./cache.js";

export default class SetCache {
  static setCache(values, key) {
    const objectValues = {...values}
    return Cache.set(key, objectValues)
  }
}
