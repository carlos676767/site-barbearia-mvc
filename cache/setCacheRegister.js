import set from "./cache.js";
"use strict";

export default class CacheSet {
  static setUser(user, email, senha, codigo) {
    return set.set(`myUser`,{
      user,
      email,
      senha,
      codigo
    });
  }
}