const Joi = require('joi')

const productoSchema = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(255).message({
        "any.require": "Producto es requerido",
        "string.min": "Producto debe tener mínimo de 3 carácteres",
        "string.max": "Producto debe tener máximo 255 carácteres",
        "string.empty": "Producto no puede estar vacío"
    }),
    descripcion: Joi.string().required().min(3).max(255).message({
        "any.require": "Descripción es requerido",
        "string.min": "Descripción debe tener mínimo de 3 carácteres",
        "string.max": "Descripción debe tener máximo 255 carácteres",
        "string.empty": "Descripción no puede estar vacío"
    }),
    precio: Joi.number().precision(2).required().min(1).message({
        "any.require": "Precio de contacto es requerido",
        "number.min": "Precio mínimo debe tener 1 número",
        "number.precision":"Precio debe tener 2 números como decimales",
        "number.empty": "El número de contacto no puede estar vacío"
    }),
    pathImg: Joi.string().required().min(3).max(255).message({
        "any.require": "pathImg es requerido",
        "string.min": "pathImg debe tener mínimo de 3 carácteres",
        "string.max": "pathImg debe tener máximo 255 carácteres",
        "string.empty": "pathImg no puede estar vacío"
    })
})

module.exports = productoSchema