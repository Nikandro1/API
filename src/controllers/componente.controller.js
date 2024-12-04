const { Model } = require('sequelize')
const { Componente, Fabricante, Producto} = require('../models')
const cliente = require('../redis')
const controller = {}

const getAllComponentes = async(req,res)=>{
    const componentesCache = await cliente.get("componentes")
    if(componentesCache)
        return res.status(200).json(JSON.parse(componentesCache))
    const componentes = await Componente.findAll({})
    await cliente.set("componentes", JSON.stringify(componentes), "EX", 5000)
    res.status(200).json(componentes)
}

controller.getAllComponentes = getAllComponentes

const getComponenteById = async(req,res)=>{
    const id = req.params.id
    const componenteCache = await cliente.get(`componente${id}`)
    if(componenteCache)
        return res.status(200).json(JSON.parse(componenteCache))
    const componente = await Componente.findByPk(id)
    await cliente.set(`componente${id}`, JSON.stringify(componente), "EX", 5000)
    res.status(200).json(componente)
}

controller.getComponenteById = getComponenteById

const postComponente = async(req,res)=>{
    const {nombre, descripcion} = req.body
    const componenteNuevo = await Componente.create({
        nombre,
        descripcion
    })
    const componente = await Componente.findAll({})
    await cliente.set("componentes", JSON.stringify(componente), "EX", 5000)
    res.status(201).json(componenteNuevo)
}
controller.postComponente = postComponente

const deleteComponenteById = async(req,res)=>{
    const idComponente = req.params.id
    const r = await Componente.destroy({ where: { id: idComponente } })
    await cliente.del(`componente${idComponente}`)
    const componente = await Componente.findAll({})
    await cliente.set("componentes", JSON.stringify(componente), "EX", 5000)
    res.status(204).json({ mensaje: `filas afectados ${r}` })
}


controller.deleteComponenteById = deleteComponenteById

const updateComponente = async (req, res) => {
    const { nombre, descripcion } = req.body
    const id = req.params.id
    const componente = await Componente.findByPk(id)
    componente.nombre = nombre;
    componente.direccion = direccion;
    await componente.save()
    await cliente.set(`componente${id}`, JSON.stringify(componente), "EX", 5000)
    const componenteCache = await Componente.findAll({})
    await cliente.set("componentes", JSON.stringify(componenteCache), "EX", 5000)
    res.status(200).json(componente)
}
controller.updateComponente = updateComponente

const getProductoAndComponentesById = async (req, res) => {
    const id = req.params.id
    const componente = await Componente.findOne({
        where: {id},
        include:{
            model:Producto,
            through:{
                attributes: []
            }
        }
    })

    res.status(200).json(componente)
}

controller.getProductoAndComponentesById = getProductoAndComponentesById

module.exports = controller