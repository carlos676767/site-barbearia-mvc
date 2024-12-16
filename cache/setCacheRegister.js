import set from "./cache";


export default class CacheSet {
  static setUser(user, email, senha) {
    return set.set({
      user,
      email,
      senha,
    });
  }
}


