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
class Alert {
  static alert(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "OK",
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

  

      
      if (response.ok) {
        return  Alert.alert(`sucesso`, `foi enviado uma mensagem para seu email`, `success`)
      }
      const userReponse = await response.json();
      const {msg} = userReponse
      return Alert.alert(`error`, `${msg}`, `error`)
    } catch (error) {
      return  Alert.alert(`sucesso`, `ocorreu um erro tente novamente`, `error`)
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
