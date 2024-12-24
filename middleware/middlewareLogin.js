import DecodJsonWebToken from "../utils/auth/jwtDecode.js";

export default async function LoginMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header not provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token not provided");
    }

    const verifyToken = await DecodJsonWebToken.decod(token);

    if (!verifyToken) {
      throw new Error("Invalid or expired token");
    }
    
    next();
  } catch (error) {
    res.status(400).send({msg: error.message})
  }
}