const {Componente} = require('../models')
const middleware = {}

const validarComponenteId = (req,res,next)=>{
    const id = req.params.id
    const componente = Componente.findByPk(id)
    if(!componente){
        res.status(404).json({message:`el ${id} no existe`})
    }
    next()
}

middleware.validarComponenteId = validarComponenteId

module.exports = middleware