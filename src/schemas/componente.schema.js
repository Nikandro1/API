const Joi = require('joi')

const componenteSchema = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(255).message({
        "any.require":"Nombre es requerido",
        "string.min":"Nombre debe tener mínimo de 3 carácteres",
        "string.max":"Nombre debe tener máximo 255 carácteres",
        "string.empty":"Nombre no puede estar vacío"
    }),
    descripcion: Joi.string().required().min(3).max(255).message({
        "any.require": "Descripción es requerido",
        "string.min":"La descripción debe tener mínimo de 3 carácteres",
        "string.max":"La descripción debe tener máximo 255 carácteres",
        "string.empty":"La descripción no puede estar vacío"
    })
})

module.exports = componenteSchema