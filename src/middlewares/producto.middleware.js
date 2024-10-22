const {Producto} = require('../models')
const middleware = {}

const validarProductoId = (req,res,next)=>{
    const id = req.params.id
    const producto = Producto.findByPk(id)
    if(!producto){
        res.status(404).json({message:`el ${id} no existe`})
    }
    next()
}

middleware.validarProductoId = validarProductoId

module.exports = middleware