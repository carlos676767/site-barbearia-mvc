class GetEmail {
  static email = document.querySelector(`input`);

  static getEmail() {
    return JSON.stringify({
      email: this.email.value.trim(),
    });
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

class SendEmail extends GetEmail {
  static async send() {
    try {
      const response = await fetch(
        `http://localhost:8080/verifyEmailResetPass`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.getEmail(),
        }
      );

      const getReponse = await response.json();
      if (getReponse.err === true) {
        return Alert.alert(
          `Verifique sua entrada`,
          `verifique seu email.`,
          `success`
        );
      }
    } catch (error) {
      return Alert.alert(`Error, preste atencao`, error, `error`);
    }
  }
}

class Btn extends SendEmail {
  static btn = document.querySelector(`button`);

  static btnEvent() {
    this.btn.addEventListener(`click`, (e) => {
      e.preventDefault();
      this.send();
    });
  }
}

Btn.btnEvent();
