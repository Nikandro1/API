const express = require('express')
const app = express()
const db = require('./models')
const routes = require('./routes')
const {sequelize} = require('../data/database')

require('dotenv').config({path:'./.env'})

const PORT = process.env.PORT

app.use(express.json())

app.use(routes.productoRoute)
app.use(routes.fabricanteRoute)
app.use(routes.componenteRoute)



app.listen(PORT, async ()=>{
    await sequelize.authenticate()
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
    db.sequelize.sync({force:true})
})