class RemoveItwem {
  static removeItem(value) {
    const table = document.querySelector(value);
    return table.remove();
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
      return this.removeItem(`table`);
    }
  }
}

class ShowUsers extends GetUser {
  static tbody = document.getElementById(`users`);

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
  static imagem = document.getElementById(`imagem`);

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
        return Alert.alert(
          `Cabelos cadastrado com sucesso...`,
          `o cabelo foi cadatsrado com sucesso.`,
          `success`
        );
      }
      return Alert.alert(
        `Erro ao cadastrar cabelo...`,
        `tente novamente cadastrar o cabelo.`,
        `error`
      );
    } catch (error) {
      return Alert.alert(
        `Erro ao cadastrar cabelo...`,
        `tente novamente cadastrar o cabelo.`,
        `error`
      );
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

class GetCabelos {
  static async getCaelos() {
    try {
      const getCaelos = await fetch(`http://localhost:8080/getCabelos`);

      if (getCaelos.ok) {
        return await getCaelos.json();
      }
    } catch (error) {
      RemoveItwem.removeItem(`.tabelaCabelos`);
    }
  }
}

class ViewCabelos extends GetCabelos {
  static tabelaCabelos = document.getElementById(`tabelaCabelos`);

  static async viewCabelos() {
    const getCabelos = await this.getCaelos();

    if (getCabelos != undefined) {
      getCabelos.cortes.forEach((char) => {
        const { cabelo, preco, url, id } = char;

        this.tabelaCabelos.innerHTML += `  <td>${cabelo}</td>
          <td>${preco}</td>
          <td><img src="http://localhost:8080/${url}" alt="${url}" width="50"></td>
          <td>
            <button class="btn btn-warning btn-sm btnEditar" data-id="${id}">Editar</button>
            <button class="btn btn-danger btn-sm btnDeletar" data-id="${id}">Excluir</button>
          </td>`;
      });
    }
  }
}

addEventListener(`DOMContentLoaded`, async () => {
  await ShowUsers.showUsers();
  await ViewCabelos.viewCabelos();
});

class DeleteAllCortes extends Alert {
  static btn = document.getElementById(`deleteAll`);

  static btnDeleteEvent() {
    this.btn.addEventListener(`click`, async () => {
      const deleteItem = await fetch(`http://localhost:8080/deleteCabelos`, {
        method: `delete`,
      });

      if (deleteItem.ok || deleteItem.status === 200) {
        return Alert.alert(
          `Cabelos Deletado com sucesso...`,
          `os cabelos foi deletado com sucesso.`,
          `success`
        );
      }
      return Alert.alert(
        `Erro ao deletar cabelos...`,
        `tente novamente deletar os cabelos.`,
        `error`
      );

    });
  }
}

DeleteAllCortes.btnDeleteEvent();
