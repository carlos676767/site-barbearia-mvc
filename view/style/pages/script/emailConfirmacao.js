class GetToken {
  static getToken() {
    return JSON.stringify({
      token: location.href.split(`=`)[1],
    });
  }
}
GetToken.getToken();

class VerifyToken extends GetToken {
  static async upCode() {
    addEventListener(`DOMContentLoaded`, async () => {
      try {
        const sendToken = await fetch(
          `http://localhost:8080/user/valideRegister`,
          {
            method: `POST`,
            headers: {
              "Content-Type": "application/json",
            },
            body: this.getToken(),
          }
        );

        const itemResponse = await sendToken.json();
        console.log(itemResponse);

        if (sendToken.ok) {
          const {tk} = itemResponse
          localStorage.setItem(`token`, tk)
          
          return alert(`Usuario autentincado com sucesso.`);
        }
        
        return alert( `o tempo de expiracao para validar passou, tente novamente.` );
      } catch (error) {
        return alert(`erro tente novamente reiniciando a pagina.`);
      }
    });
  }
}

VerifyToken.upCode();
