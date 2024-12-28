class GetTk {
  static getToken() {
    
    return localStorage.getItem("token");
  }
}


class Alert {
    static alert(title, text, icon) {
      return Swal.fire({
        title: title,
        text: text,
        icon: icon,
      });
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

      
      if (!response.ok) {
        Alert.alert("Erro", "Login expirado , entre novamente, em 5 segundos voce ira ser redirecionado para o login.", "error");
        return setTimeout(() => {
          location.href = "./login.html";
        }, 5000);
      }

    } catch (error) {
      console.error("Erro ao enviar autorização:", error.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", async() => {
 await  AuthSender.sendAuthorization();
});
