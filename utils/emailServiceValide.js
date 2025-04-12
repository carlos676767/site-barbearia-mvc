export default class EmailValide {
  static valideEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      throw new Error("email invalido");
    };

    if (!email) {
      throw new Error("preencha um email");
    };


  };
};