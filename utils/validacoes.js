export default class ValidateFields {
  static validateFields(item) {
    for (const [key, value] of Object.entries(item)) {
      if (!value) {
        throw new Error(`the item needs a value ${value}`);
      }
    }
  }
}
