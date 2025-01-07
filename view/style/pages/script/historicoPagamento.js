class GetTk {
  static getTk() {
    return localStorage.getItem("token");
  }
}

function Alert(title, text, icon) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }


class GetHistory extends GetTk {
  static async getHistory() {
    try {
      const getItens = await fetch(
        `http://localhost:8080/getHistor/${GetTk.getTk()}`
      );
      const itens = await getItens.json();
      console.log(itens);
      
      const {err} = itens

      if (err === `"the expiration time has passed, try again, you have a time of 1 hour" `) {
        Alert.alert("Erro", "Login expirado , entre novamente, em 5 segundos voce ira ser redirecionado para o login.", "error");
        return setTimeout(() => {
          location.href = "./login.html";
        }, 5000);
      }

      return itens
    } catch (error) {
        Alert.alert("Erro", `${error}`, "error");
    }
  }
}


class ViewItens extends  GetHistory {
    static tbdiy = document.querySelector(`tbody`)

    static async getItem(){
        const item = await GetHistory.getHistory()
        item.historcUser.forEach((char) => {
            ViewItens.tbdiy.innerHTML += `
            <tr>
             <td>${char.data}</td>
                        <td>${char.nome_cabelo}</td>
                <td>${char.preco}</td>
                 <td><span class="payment-status success">Pago</span></td>
     
            </tr>
            `
        });
    }
}


addEventListener(`DOMContentLoaded`, async () => {
  await ViewItens.getItem();
});
