class RemoveItwem {
  static table = document.querySelector(`table`);

  static removeItem() {
    this.table.remove();
  }
}

class GetUser extends RemoveItwem {
  static async getUserDatabase() {
    try {
      const getUser = await fetch(`http://localhost:8080/getUser`);
      if (getUser.ok || getUser.status == 200) {
        return await getUser.json();
      }
    } catch (error) {
      return this.removeItem();
    }
  }
}

class ShowUsers extends GetUser {
  static tbody = document.querySelector(`tbody`);

  static async showUsers() {
    const getUser = await this.getUserDatabase();

    getUser.users.forEach((char) => {
      const { nome, email, userId } = char;

      this.tbody.innerHTML += `  <tr>
      <th scope="row">${userId}</th>
      <td>${nome}</td>
      <td>${email}</td>
      <td>
          <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i> Excluir</button>
      </td>
  </tr>`;
    });
  }
}

addEventListener(`DOMContentLoaded`, async () => {
  await ShowUsers.showUsers();
});

class Alert {
  static alert(title, text, icon) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

class GetInputs {
  static nomeCorte = document.getElementById(`nomeCorte`);
  static preco = document.getElementById(`descricao`);
  static imagem = document.getElementById(`imagem`)

  static getInputs() {
    const formData = new FormData();
    formData.append(`file`, this.imagem.files[0]);
    formData.append(`nome`, this.nomeCorte.value);
    formData.append(`preco`, this.preco.value);
    return formData;
  }

  static async httpRequestSendCabelos() {
    try {
      const response = await fetch(`http://localhost:8080/insertCortes`, {
        method: `POST`,
        body: this.getInputs(),
      });

      if (response.ok || response.status == 200) {
        return Alert.alert(`Cabelos cadastrado com sucesso...`, `o cabelo foi cadatsrado com sucesso.`, `success`)
      }

    } catch (error) {
      return  Alert.alert(`Erro ao cadastrar cabelo...`, `tente novamente cadastrar o cabelo.`, `error`)
    }
  }
}

class ButtonEvent extends GetInputs {
  static btnSend = document.getElementById(`btnId`);

  static btnEventList() {
    this.btnSend.addEventListener(`click`, async (e) => {
      e.preventDefault();
      await this.httpRequestSendCabelos();
    });
  }
}

ButtonEvent.btnEventList();
