import tk from "jsonwebtoken";

export default class JwtAsign {
  static jwt(...values) {
    const objectValues = Object.assign({}, ...values);
    return tk.sign(objectValues, process.env.SECRET_KEY_JWT, {expiresIn: `1h`});
  }
}

