import fs from "fs";

export default class DeleteItem {
  static deleteItem(file) {
    return fs.unlink(file, (err) => {
      return true
    });
  }
}
