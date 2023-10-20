import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateId from "../helpers/generateId.js";

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    default: null,
    trim: true,
  },
  token: {
    type: String,
    default: generateId(),
  },
  confirm: {
    type: Boolean,
    default: false,
  },
});

// Hashear password
// Mongoose tiene un middleware y con pre lo que se hace ese ejecutar primero cierta acción en este caso hashear el password antes de realizar el guardado, es necesario el uso de una función no asíncrona ya que se hace uso el objeto en si y no al ambiente en general
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Patient = mongoose.model("Patients", patientSchema);
export default Patient;
