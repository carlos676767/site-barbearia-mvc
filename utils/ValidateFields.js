export default class ValidateFields {
  static validateFields(item) {
    const itemValide = Object.entries(item).map((char) => char[1]);

    for (let i = 0; i < itemValide.length; i++) {
      if (itemValide.includes("")) {
        throw new Error(
          "Please fill in all the fields or check if you entered the wrong data, thank you."
        );
      }
    }
  }
}
