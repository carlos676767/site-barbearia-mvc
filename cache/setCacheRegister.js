import set from "./cache.js";


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