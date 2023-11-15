import nodemailer from "nodemailer";

const emailRegister = async (data) =>{
    const transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    });

    const { email, name, token } = data


    const info = await transporter.sendMail({
        from: "Psynergia - Administracion",
        to: email,
        subject: "Confirma tu cuenta en Psynergia",
        text: "Confirma tu cuenta en Psynergia",
        html: `
        <p>Hola ${name}, por favor confirma tu cuenta acontinuacion, en el siguiente link:
        <a href="${process.env.LINK}/confirm-account/${token}">Comprobar cuenta </a></p>
        <p>Si tu no creaste esta cuenta, por favor ignora este mensaje.</p>
        `
    });

    console.log("Mensaje enviado")
}

export default emailRegister;