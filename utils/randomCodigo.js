export default class CodeRandom {
  static getCode() {
    return Array.from(Array(5).keys())
      .map(() => Math.floor(Math.random() * 59))
      .join("");
  }
}


