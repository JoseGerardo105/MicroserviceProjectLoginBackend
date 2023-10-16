
const registrar = (req, res) =>{
    res.json({msg: 'Registrando usuarios'})
}

const login = (req, res) =>{
    res.json({url: 'Desde api piscologos login'})
}

const perfil = (req, res) =>{
    res.json({msg: 'Mostrando perfil'})
}

export {
    registrar, login, perfil
}