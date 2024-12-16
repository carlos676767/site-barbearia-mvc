import NodeCache from "node-cache";

class Cache {
  static cacheData() {
    return new NodeCache();
  }
}

export default Cache.cacheData()