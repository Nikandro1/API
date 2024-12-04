const { Model } = require('sequelize')
const { Componente, Fabricante, Producto} = require('../models')
const cliente = require('../redis')
const controller = {}

const getAllFabricantes = async(req,res)=>{
    const fabricanteCache = await cliente.get("fabricantes")
    if (fabricanteCache)
        return res.status(200).json(JSON.parse(fabricanteCache))
    const fabricantes = await Fabricante.findAll({})
    await cliente.set("fabricantes", JSON.stringify(fabricantes), "EX", 5000)
    res.status(200).json(fabricantes)
}

controller.getAllFabricantes = getAllFabricantes


const getFabricanteById = async(req,res)=>{
    const id = req.params.id
    const fabricanteIDCache = await cliente.get(`fabricante${id}`)
    if (fabricanteIDCache)
        return res.status(200).json(JSON.parse(fabricanteIDCache))
    const fabricante = await Fabricante.findByPk(id)
    await cliente.set(`fabricante${id}`, JSON.stringify(fabricante))
    res.status(200).json(fabricante)
}

controller.getFabricanteById = getFabricanteById

const postFabricante = async(req,res)=>{
    const {nombre, direccion, numeroContacto, pathImgPerfil} = req.body
    const fabricanteNuevo = await Fabricante.create({
        nombre,
        direccion,
        numeroContacto,
        pathImgPerfil
    })
    const fabricantes = await Fabricante.findAll({})
    await cliente.set("fabricantes", JSON.stringify(fabricantes), "EX", 5000)
    res.status(201).json(fabricanteNuevo)
}
controller.postFabricante = postFabricante

const deleteFabricanteById = async(req,res)=>{
    const idFabricante = req.params.id
    const r = await Fabricante.destroy({ where: { id: idFabricante } })
    //Se borra la cache del fabricante especifico y se actualiza la de todos los fabricantes
    await cliente.del(`fabricante${idFabricante}`)
    const fabricantes = await Fabricante.findAll({})
    await cliente.set("fabricantes", JSON.stringify(fabricantes), "EX", 5000)
    res.status(204).json(r)
}

controller.deleteFabricanteById = deleteFabricanteById

const updateFabricante = async (req, res) => {
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body
    const id = req.params.id
    const fabricante = await Fabricante.findByPk(id)
    fabricante.nombre = nombre;
    fabricante.direccion = direccion;
    fabricante.numeroContacto = numeroContacto
    fabricante.pathImgPerfil = pathImgPerfil
    await fabricante.save()
    //Se actualiza la cache del fabricante modificado y la de todos los fabricantes
    await cliente.set(`fabricante${id}`, JSON.stringify(fabricante))
    const fabricantes = await Fabricante.findAll({})
    await cliente.set("fabricantes", JSON.stringify(fabricantes), "EX", 5000)
    res.status(200).json(fabricante)
}
controller.updateFabricante = updateFabricante

const getFabricanteAndProductosById = async (req, res) => {
    const id = req.params.id
    const fabricante = await Fabricante.findOne({
        where: {id},
        include:{
            model:Producto,
            through:{
                attributes: []
            }
        }
    })
    res.status(200).json(fabricante)
}

controller.getFabricanteAndProductosById = getFabricanteAndProductosById

module.exports = controller