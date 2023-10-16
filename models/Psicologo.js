import mongoose from 'mongoose'


const psicologoSchema = mongoose.Schema({
   nombre:{
    type: String,
    required: true,
    trim: true
   },
   password:{
    type: String,
    required: true,
   }, 
   email:{
    type: String,
    required: true,
    unique: true,
    trim: true
   },
   token:{
    type: String
   },
   confirmado:{
    type: Boolean,
    default:false
   }
})

const Psicologo = mongoose.model("Psicologo", psicologoSchema);
export default Psicologo;