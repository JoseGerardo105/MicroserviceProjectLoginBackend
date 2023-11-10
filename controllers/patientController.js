import Patient from "../models/Patient.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import emailRegister from "../helpers/emailRegister.js";
import emailForgetPassword from "../helpers/emailForgetPassword.js";

const register = async (req, res) => {
  // Prevenir pacientes duplicados (correo único)
  const { email, name } = req.body;
  const existing = await Patient.findOne({ email });
  if (existing) {
    const error = new Error("Ya existe un paciente con el email ingresado");
    return res.status(404).json({ msg: error.message });
  }

  // En caso de que el paciente sea único se hace el registro
  try {
    const patient = new Patient(req.body);
    const newPatient = await patient.save();

    //Enviar el e-mail
  
    emailRegister({
      email,
      name,
      token: newPatient.token
    })

    res.json({ "Paciente registrado": newPatient });
  } catch (error) {
    console.log(error);
  }
};

const profile = (req, res) => {
  res.json({ profile: req.patient });
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
  if (!patient.confirm) {
    const error = new Error("La cuenta no está confirmada");
    return res.status(404).json({ msg: error.message });
  }

  // Verificar contraseña ingresada
  if (await patient.verifyPassword(password)) {
    // Autenticar al paciente
    return res.json({ token: generateJWT(patient.id) });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(404).json({ msg: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const patient = await Patient.findOne({ email });

  if (!patient) {
    const error = new Error("No existen registros con el email ingresado");
    res.status(400).json({ msg: error.message });
  }

  try {
    patient.token = generateId();
    await patient.save();

    //enviar email

    emailForgetPassword({
      email,
      name: patient.name,
      token: patient.token
    })

    res.json({ msg: "Se ha enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;
  const patient = await Patient.findOne({ token });

  if (!patient) {
    const error = new Error("Error, token para cambio de contraseña inválido");
    return res.status(400).json({ msg: error.message });
  } else {
    return res.json({ msg: "Token válido, se puede cambiar la contraseña" });
  }
};

const changePassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const patient = await Patient.findOne({ token });

  if (!patient) {
    // Si no existe pacientes correspondientes al token de la URL
    const error = new Error("Error, url para el cambio de password incorrecta");
    return res.status(403).json({ msg: error.message });
  }

  patient.token = null;
  patient.password = password;
  await patient.save();
  res.json({msg: "Password modificado correctamente"});
};

export {
  register,
  profile,
  confirm,
  authenticate,
  forgetPassword,
  checkToken,
  changePassword,
};
