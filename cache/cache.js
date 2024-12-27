import NodeCache from "node-cache";
"use strict";
class Cache {
  static cacheData() {
    return new NodeCache();
  }
}

export default Cache.cacheData()