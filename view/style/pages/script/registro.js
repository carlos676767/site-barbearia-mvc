


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

  
      const userReponse = await response.json();
      
      if (response.ok) {
        const {msg} = userReponse
        return  Alert(msg, `alertasucess`, `textSucess`)
      }
     
      
      const {err} = userReponse
      return Alert(err, `alerterr`,`textValue`)
    } catch (error) {
      return  Alert( `ocorreu um erro tente novamente`, `alerterr`, `textValue`)
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
