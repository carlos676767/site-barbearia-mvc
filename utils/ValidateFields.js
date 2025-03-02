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

  static valideNum(num){
    if (num < 0) {
      throw new Error("num must be greater than zero");
      
    }

    if (typeof num !== "number") {
      throw new Error("num must be a number");
    }
  }



}
