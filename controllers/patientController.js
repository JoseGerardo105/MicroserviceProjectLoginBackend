import Patient from "../models/Patient.js";

const register = async (req, res) => {
  // Prevenir pacientes duplicados (correo único)
  const { email } = req.body;
  const existing = await Patient.findOne({ email });
  if (existing) {
    const error = new Error("Ya existe un paciente con el email ingresado");
    return res.status(400).json({ msg: error.message });
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

export { register, login, profile, confirm };
