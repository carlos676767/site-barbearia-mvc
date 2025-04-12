class GetToken {
  static getToken() {
    return location.href.split(`=`)[1]
  }
}
class InputValues extends GetToken {
  static newPassword = document.getElementById(`newPassword`);
  static confirmPassword = document.getElementById(`confirmPassword`);
  static getInput() {
   
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
        return    Alert(`senha alterada com sucesso.`,`alertasucess`, `textSucess`)
      }
      
      return Alert(`ocorreu um erro tente novamente.`, `alerterr`,`textValue`)
    } catch (error) {
      return Alert(error.message, `alerterr`,`textValue`)
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