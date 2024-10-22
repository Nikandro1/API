const { Model } = require('sequelize')
const { Componente, Fabricante, Producto} = require('../models')
const controller = {}

const getAllFabricantes = async(req,res)=>{
    const fabricantes = await Fabricante.findAll({})
    res.status(200).json(fabricantes)
}

controller.getAllFabricantes = getAllFabricantes


const getFabricanteById = async(req,res)=>{
    const id = req.params.id
    const fabricante = Fabricante.findByPk(id)
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
    res.status(201).json(fabricanteNuevo)
}
controller.postFabricante = postFabricante

const deleteFabricanteById = async(req,res)=>{
    const idFabricante = req.params.id
    const r = await Producto.destroy({ where: { id: idFabricante } })
    res.status(204).json({ mensaje: `filas afectados ${r}` })
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