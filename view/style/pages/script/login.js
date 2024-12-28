

function Alert(title, text, icon) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon
  });
}

class GetTk {
  static getToken() {
    return localStorage.getItem("token");
  }
}

class AuthSender extends GetTk {
  static async sendAuthorization() {
    try {
      const response = await fetch("http://localhost:8080/verifyLoginToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: this.getToken() }),
      });


      if (response.ok) {
        return (location.href = "./agemdamento.html");
      }


    } catch (error) {
      console.error("Erro ao enviar autorização:", error.message);
    }
  }
}





document.addEventListener("DOMContentLoaded", () => {
  AuthSender.sendAuthorization();
});

class ObjectsValues {
  static senha = document.getElementById("password");
  static email = document.getElementById("email");
  static objectValuesItem() {
    return JSON.stringify({
      email: this.email.value.trim(),
      senha: this.senha.value.trim(),
    });
  }
}


class Login extends ObjectsValues {
  static async sendItensLogin() {
    try {
      const loginSend = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: this.objectValuesItem(),
      });
      if (loginSend.ok) {
       const data = await loginSend.json()
       Alert(`Login com sucesso.`, `Parabens voce acaba de fazer login`, `success`)
       localStorage.setItem(`token`, data.tk)
       return  location.href ="./agemdamento.html";
      }

      return  Alert(`Senha errada.`, `Login esta incorreto tente novamente`, `error`)
    } catch (error) {
    return  Alert(`erro inesperado.`, `Tente novamente , erro.`, `error`)
    }
  }
}


class ButtonEventList extends Login {
  static btn = document.querySelector("button");

  static btnEvent() {
    this.btn.addEventListener("click", async (e) => {
      e.preventDefault();
       this.sendItensLogin()
    });
  }
}


ButtonEventList.btnEvent();
