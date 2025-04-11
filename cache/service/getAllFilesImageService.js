import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

export default class GetAllFilesImageService {
  static getPath(){
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);

    const asPath = path.join(__dirname, "../image");
    return asPath
  }
  static async getAllFileImage() {
    const path = GetAllFilesImageService.getPath()

    const files = await fs.readdir(path);
    return files;
  }
}

