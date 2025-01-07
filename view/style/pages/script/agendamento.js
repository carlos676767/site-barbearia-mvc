class GetTk {
  static getToken() {
    return localStorage.getItem("token");
  }
}
const select = document.querySelector(`select`);

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
        Alert.alert(
          "Erro",
          "Login expirado , entre novamente, em 5 segundos voce ira ser redirecionado para o login.",
          "error"
        );
        return setTimeout(() => {
          location.href = "./login.html";
        }, 5000);
      }
    } catch (error) {
      console.error("Erro ao enviar autorização:", error.message);
    }
  }
}

class GetCabelos {
  static async getCaelos() {
    try {
      const getCaelos = await fetch(`http://localhost:8080/getCabelos`);

      if (getCaelos.ok) {
        return await getCaelos.json();
      }
    } catch (error) {
      console.error("Erro ao buscar cabelos:", error.message);
    }
  }
}

class CabelosInSelect extends GetCabelos {
  static async viewCabelosInOptionSelect() {
    const getCabelos = await this.getCaelos();
    getCabelos.cortes.forEach((char) => {
      select.innerHTML += `<option value="${char.id}" >${char.cabelo}</option>`;
    });
  }
}

class ObjectValues {
  static radio = document.querySelectorAll('input[type="radio"]');
  static inputDate = document.getElementById(`date`);
  static time = document.getElementById(`time`);
  static getInputValues() {
    let RadioInput = ``;
    this.radio.forEach((radio) => {
      if (radio.checked) {
        RadioInput = radio.value;
      }
    });
    return RadioInput;
  }

  static objectReponseData() {
    return JSON.stringify({
      cabelo: select.value,
      pagamentoForma: this.getInputValues(),
      dataServico: this.inputDate.value.trim(),
      usuarioToken: GetTk.getToken(),
      hour: this.time.value,
    });
  }
}

class AgendeItens extends ObjectValues {
  static async agendar() {
    try {
      const responseData = await fetch(`http://localhost:8080/pagamentos`, {
        method: `POST`,
        body: this.objectReponseData(),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await responseData.json();
      if (responseData.ok) {
        const { url } = data;
        return (location.href = url);
      }

      const { msg } = data;
      if (
        msg ===
        "the expiration time has passed, try again, you have a time of 1 hour"
      ) {
        Alert.alert(
          "Erro",
          "Login expirado , entre novamente, em 5 segundos voce ira ser redirecionado para o login.",
          "error"
        );
        return setTimeout(() => {
          location.href = "./login.html";
        }, 5000);
      }
      Alert.alert("Erro", `${msg}`, "error");
    } catch (error) {
      Alert.alert("Erro", `${error}`, "error");
    }
  }
}

class BtnEvent extends AgendeItens {
  static btn = document.getElementById(`agendar`);
  static buttonEventList() {
    this.btn.addEventListener(`click`, async (e) => {
      e.preventDefault();
      await this.agendar();
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await AuthSender.sendAuthorization();
  CabelosInSelect.viewCabelosInOptionSelect();
  BtnEvent.buttonEventList();
});

class GetItens {
  static async getItens() {
    const getCortes = await fetch(`http://localhost:8080/getCabelos`);
    const data = await getCortes.json();
    return data;
  }
}

class ListCortes extends GetItens {
  static divCortes = document.getElementById(`div-corte`);

  static async lsitCortes() {
    const getCortes = await this.getItens();


    getCortes.cortes.forEach((cabelos) => {
      const { id, cabelo, preco, url } = cabelos;
      this.divCortes.innerHTML += `<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="card service-card shadow">
            <img src="http://localhost:8080/${url}" class="card-img-top" alt="Corte Moderno" id="img-corte">
            <div class="card-body">
              <h5 class="card-title"><i class="fa-solid fa-user-hair"></i>${cabelo}</h5>
              <p class="card-text">Visual inovador para acompanhar as tendências.</p>
              <p class="price">R$ ${preco},00</p>
            </div>
          </div>
        </div>`;
    });
  }
}


// <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
// <span class="carousel-control-prev-icon" aria-hidden="true"></span>
// <span class="visually-hidden">Previous</span>
// </button>
// <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
// <span class="carousel-control-next-icon" aria-hidden="true"></span>
// <span class="visually-hidden">Next</span>
// </button>
// </div>`


addEventListener(`DOMContentLoaded`, async () => {
  await ListCortes.lsitCortes();
});
