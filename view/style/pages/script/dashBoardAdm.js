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
  </tr>`
      
    });
  }
}

addEventListener(`DOMContentLoaded`, async () => {
  await ShowUsers.showUsers();
});
