// import Alerts from "../../../../utils/alerts";


class ValuesObject {
  static nome = document.getElementById("name")
  static email = document.getElementById("email")
  static password = document.getElementById(`password`)
  static userData() {
    return JSON.stringify({
      user: this.nome.value.trim(),
      email: this.email.value.trim(),
      senha: this.password.value.trim(),
    });
  }
}

class RegisterUser extends ValuesObject {
  static async registerUserBy() {

    try {
      const response = await fetch(`http://localhost:8080/users/activate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: this.userData(),
      });

  

      const data = await response.json();
      alert(JSON.stringify(data))
      
    } catch (error) {
      console.log(error.err);
    }
  }
}

class Button extends RegisterUser {
  static button = document.querySelector(`button`);

  static buttonEvent() {
    this.button.addEventListener(`click`, (e) => {
       this.registerUserBy();
        e.preventDefault();
    });
  }
}

Button.buttonEvent();
