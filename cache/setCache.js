import Cache from "./cache.js";

export default class SetCache {
  static setCache(key, values) {
    return Cache.set(key, values)
  }
}
