import DeleteItem from "../utils/deleteItem.js";
import Sql from "./db/db.js"; // Certifique-se de que esse módulo está configurado corretamente.
import fs from "fs/promises";
export default class DeleteAllCortes {
  static async delete() {
    const connecyt = await Sql.db();
    try {
      const cortesGet = await connecyt.all(`SELECT * FROM CABELOS`);
      if (cortesGet.length > 0) {
        await connecyt.run("DELETE FROM CABELOS");
        const files = await fs.readdir(
          `C://Users//Administrator//Desktop//SITE BARBEARIA MVC//image`
        );

        for (const i of files) {
          DeleteItem.deleteItem( `C://Users//Administrator//Desktop//SITE BARBEARIA MVC//image/${i}` );
        }
        return true
      }

      throw new Error("There are no cuts in our database");
    } catch (error) {
      throw new Error("error ao deletar tente novamante");
    } finally {
      await connecyt.close();
    }
  }
}
