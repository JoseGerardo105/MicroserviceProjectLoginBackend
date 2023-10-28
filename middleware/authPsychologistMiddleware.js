import jwt from "jsonwebtoken";
import Psychologist from "../models/Psychologist.js";

const checkAuthPsychologist = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Comprobar el token
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.psychologist = await Psychologist.findById(decoded.id).select(
        "-password -token"
      );
      if(!req.psychologist){
        const e = new Error("Token inválido");
        return res.status(403).json({ msg: e.message });
      }
      return next();
    } catch (error) {
      const e = new Error("Token inválido");
      return res.status(403).json({ msg: e.message });
    }
  } else {
    const error = new Error("Token inválido o inexistente");
    return res.status(403).json({ msg: error.message });
  }

  return next();
};

export default checkAuthPsychologist;
