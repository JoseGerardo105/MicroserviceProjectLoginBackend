import Psychologist from "../models/Psychologist.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";

const register = async (req, res) => {
  // Prevenir psicólogos duplicados (correo único)
  const { email } = req.body;
  const existing = await Psychologist.findOne({ email });
  if (existing) {
    const error = new Error("Ya existe un psicólogo con el email ingresado");
    return res.status(404).json({ msg: error.message });
  }

  // En caso de que el psicólogo sea único se hace el registro
  try {
    const psychologist = new Psychologist(req.body);
    const newPatient = await psychologist.save();
    res.json({ "Psicólogo registrado": newPatient });
  } catch (error) {
    console.log(error);
  }
};

const profile = (req, res) => {
  res.json({ profile: req.psychologist });
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  // Verificar existencia de psicólogo
  const psychologist = await Psychologist.findOne({ email });
  if (!psychologist) {
    const error = new Error("El psicólogo no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Verificar contraseña ingresada
  if (await psychologist.verifyPassword(password)) {
    // Autenticar al psicólogo
    return res.json({ token: generateJWT(psychologist.id) });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(404).json({ msg: error.message });
  }
};

export {
  register,
  profile,
  authenticate,
};
