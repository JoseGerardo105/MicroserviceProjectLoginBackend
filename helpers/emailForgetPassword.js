import nodemailer from "nodemailer";


const emailForgetPassword = async (data) =>{
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
        subject: "Recupera tu contraseña de Psynergia",
        text: "Recupera tu cuenta en Psynergia",
        html: `
        <p>Hola ${name}, por favor da click en el enlace a continuacion, para recuperar tu contraseña.
        <a href="${process.env.LINK}/restore-account/${token}">Reestablecer contraseña </a></p>
        <p>Si tu no creaste esta cuenta, por favor ignora este mensaje.</p>
        `
    });

    console.log("Mensaje enviado")
}

export default emailForgetPassword