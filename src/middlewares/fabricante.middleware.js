const {Fabricante} = require('../models')
const middleware = {}

const validarFabricanteId = (req,res,next)=>{
    const id = req.params.id
    const fabricante = Fabricante.findByPk(id)
    if(!fabricante){
        res.status(404).json({message:`el ${id} no existe`})
    }
    next()
}

middleware.validarFabricanteId = validarFabricanteId

module.exports = middleware