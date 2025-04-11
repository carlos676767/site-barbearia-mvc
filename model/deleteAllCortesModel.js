import path from "path";
import DeleteItem from "../utils/deleteItem.js";
import Sql from "./db/db.js"; 
import fs from "fs/promises";
import GetAllFilesImageService from "../cache/service/getAllFilesImageService.js";

export default class DeleteAllCortes {
  static async delete() {
    const connecyt = await Sql.db();
    try {
      const cortesGet = await connecyt.all(`SELECT * FROM CABELOS`);
      if (cortesGet.length > 0) {
        await connecyt.run("DELETE FROM CABELOS");
        const files = await GetAllFilesImageService.getAllFileImage()
        const paths = GetAllFilesImageService.getPath()

        for (const i of files) {
          DeleteItem.deleteItem( `${paths}${i}` );
        }

      }

      throw new Error("There are no cuts in our database");
    } catch (error) {
      throw new Error("error ao deletar tente novamante");
    } finally {
      await connecyt.close();
    }
  }
}
