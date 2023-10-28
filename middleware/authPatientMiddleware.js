import jwt from "jsonwebtoken";
import Patient from "../models/Patient.js";

const checkAuthPatient = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Comprobar el token
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.patient = await Patient.findById(decoded.id).select(
        "-password -token -confirm"
      );
      if(!req.patient){
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

  next();
};

export default checkAuthPatient;
