import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateId from "../helpers/generateId.js";

const psychologistSchema = mongoose.Schema({
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
  professionalCard: {
    type: String,
    required: true,
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
  speciality: {
    type: String,
    default: null,
    trim: true,
  },
});

// Hashear password
psychologistSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

psychologistSchema.methods.verifyPassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password);
}


const Psychologist = mongoose.model("Psychologists", psychologistSchema);
export default Psychologist;
