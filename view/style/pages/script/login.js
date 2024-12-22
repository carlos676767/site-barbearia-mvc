// import AlertService from "../../../../utils/alert.js";

// AlertService.showAlert('6', 'hh', 'error')



class GetTk {
    static getToken() {
      return localStorage.getItem("token");
    }
  }
  
  class AuthSender {
    static async sendAuthorization() {
      const token = GetTk.getToken();
  
      try {
        const response = await fetch("https://seu-endpoint-api.com/authorize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ action: "loginCheck" }),
        });
  

        if (response.ok || response.status == 201) {
           return location.href = 'gysvfscfscdsxd'
        }

        const getResponse = await response.json( )
        const {msg} = getResponse

        


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
      const loginSend = await fetch("", {
        method: "POST",
        headers: {},
        body: this.objectValuesItem(),
      });

      if (loginSend.ok || loginSend.status == 200) {
        location.href = "https://www.youtube.com/watch?v=SMo_hgyQOAM&list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA&index=3";
      }

    } catch (error) {

    }
  }
}

class ButtonEventList extends Login {
  static btn = document.querySelector("button");

  static btnEvent() {
    this.btn.addEventListener("click", async (e) => {
      await this.sendItensLogin();
      e.preventDefault();
    });
  }
}

SendAutth.tokenAutorzationSend();
ButtonEventList.btnEvent();
