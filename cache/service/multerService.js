"use strict";
import path from 'path';
import multer from 'multer';

export default class Multer {
  static #multer = multer;
  static multerConfig() {
    const storage = this.#multer.diskStorage({
      destination: (req, file, callback) => {
        const uploadPath = 'C://Users\Administrator//Desktop//site barbearia//image';
        callback(null, uploadPath);
      },

      filename: (req, file, callback) => {
        callback(null, file.originalname);
      },
    });

    return this.#multer({ storage: storage, fileFilter: this.fileFilter });
  }

  static fileFilter(req, file, callback) {
    const extname = path.extname(file.originalname);

    const extensionsImagesPertimidas = [
      ".jpeg",
      ".jpg",
      ".png",
    ];

    if (!extensionsImagesPertimidas.includes(extname)) {
      return callback(  new Error( "An error occurred while uploading the image. Please make sure the image is in the correct format (.jpg, .jpeg, .png) and try again." ));
    }

    const sizeLimit = 50 * 1024 * 1024;

    if (file.size > sizeLimit) {
      callback(new Error(`File size exceeds the 50MB limit`));
    };

    callback(null, true);
  };
}