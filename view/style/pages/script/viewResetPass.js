class GetToken {
  static getToken() {
    return location.href.split(`=`)[1]
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


class InputValues extends GetToken {
  static newPassword = document.getElementById(`newPassword`);
  static confirmPassword = document.getElementById(`confirmPassword`);
  static getInput() {
    alert(JSON.stringify({
      senha: this.newPassword.value.trim(),
      confirmSenha: this.confirmPassword.value.trim(),
      token: this.getToken()
    }))
    return JSON.stringify({
      senha: this.newPassword.value.trim(),
      confirmSenha: this.confirmPassword.value.trim(),
      token: this.getToken()
    });
  }
}

class ResetPass extends InputValues {
  static async resetPass() {
    try {
      const updatePass = await fetch(`http://localhost:8080/resetPass`, {
        method: `POST`,
        body: this.getInput(),
        headers: {
            "Content-Type": "application/json",
          },
      });

      if (updatePass.ok) {
        return Alert.alert(`senha trocada com sucesso.`, `sua senha foi trocada com sucesso.`, `success`)
      }
      
    } catch (error) {
        return Alert.alert(`Erro ao trocar a senha.`, error, `error`)
    }
  }
}

class btnEvent extends ResetPass {
  static btn = document.querySelector(`button`);

  static btnEvent() {
    this.btn.addEventListener(`click`, (e) => {
      e.preventDefault();
      this.resetPass();
    });
  }
}


btnEvent.btnEvent()