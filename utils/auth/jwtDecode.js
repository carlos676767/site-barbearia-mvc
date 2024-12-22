import jwt from "jsonwebtoken";

export default class DecodJsonWebToken {
  static decod(token) {
    return new Promise((ok, reject) => {
      jwt.verify(token, process.env.SECRET_KEY_JWT, (err, sucess) => {
        if (err) {
          return reject(  new Error(  "the expiration time has passed, try again, you have a time of 1 hour"  ));
        }

        return ok(sucess);
      });
    });
  }
}
