import Patient from "../models/Patient.js";
import generateJWT from "../helpers/generateJWT.js";

const register = async (req, res) => {
  // Prevenir pacientes duplicados (correo único)
  const { email } = req.body;
  const existing = await Patient.findOne({ email });
  if (existing) {
    const error = new Error("Ya existe un paciente con el email ingresado");
    return res.status(404).json({ msg: error.message });
  }

  // En caso de que el paciente sea único se hace el registro
  try {
    const patient = new Patient(req.body);
    const newPatient = await patient.save();
    res.json({ "Paciente registrado": newPatient });
  } catch (error) {
    console.log(error);
  }
};

const login = (req, res) => {
  res.json({ url: "Desde api pacientes login" });
};

const profile = (req, res) => {
  res.json({ msg: "Mostrando perfil paciente" });
};

const confirm = async (req, res) => {
  const { token } = req.params; //Leer parámetro ruta dinámica
  const patient = await Patient.findOne({ token });

  if (!patient) {
    return res.status(400).json({ msg: "Token inválido" });
  }

  try {
    patient.confirm = true;
    patient.token = null;
    await patient.save();

    res.json({ msg: "Cuenta confirmada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  // Verificar existencia de paciente
  const patient = await Patient.findOne({ email });
  if (!patient) {
    const error = new Error("No paciente no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el paciente está confirmado
  if(!patient.confirm){
    const error = new Error("La cuenta no está confirmada");
    return res.status(404).json({ msg: error.message });
  }

  // Verificar contraseña ingresada
  if(await patient.verifyPassword(password)){
  
    // Autenticar al paciente
    return res.json({ token: generateJWT(patient.id)});
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(404).json({ msg: error.message });
  }

  
};

export { register, login, profile, confirm, authenticate };
