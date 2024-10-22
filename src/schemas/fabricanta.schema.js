const Joi = require('joi')

const fabricanteSchema = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(255).message({
        "any.require": "Nombre es requerido",
        "string.min": "Nombre debe tener mínimo de 3 carácteres",
        "string.max": "Nombre debe tener máximo 255 carácteres",
        "string.empty": "Nombre no puede estar vacío"
    }),
    direccion: Joi.string().required().min(3).max(255).message({
        "any.require": "Dirección es requerido",
        "string.min": "La Dirección debe tener mínimo de 3 carácteres",
        "string.max": "La Dirección debe tener máximo 255 carácteres",
        "string.empty": "La Dirección no puede estar vacío"
    }),
    numeroContacto: Joi.number().required().min(5).message({
        "any.require": "El número de contacto es requerido",
        "number.min": "El número de contacto mínimo es de 5 números",
        "number.max": "El número de contacto máximo es de 20 números",
        "number.empty": "El número de contacto no puede estar vacío"
    }),
    pathImgPerfil: Joi.string().required().min(3).max(255).message({
        "any.require": "pathImgPerfil es requerido",
        "string.min": "pathImgPerfil debe tener mínimo de 3 carácteres",
        "string.max": "pathImgPerfil debe tener máximo 255 carácteres",
        "string.empty": "pathImgPerfil no puede estar vacío"
    })
})

module.exports = fabricanteSchema