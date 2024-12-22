import DecodJsonWebToken from "../utils/auth/jwtDecode.js";

export default async function LoginMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
       res.status(401).send({ msg: "Authorization header not provided" });
       return next()
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
       res.status(401).send({ msg: "Token not provided" });
       return next()
    }

    const verifyToken = await DecodJsonWebToken.decod(token);
    if (!verifyToken) {
       res.status(403).send({ msg: "Invalid or expired token" });
       return next( )
    }

    return res.status(201)
    
  } catch (error) {
   return next()
  }
}
