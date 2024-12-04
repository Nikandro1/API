const express = require('express')
const app = express()
const db = require('./models')
const routes = require('./routes')
const {sequelize} = require('../data/database')
const redisClient = require('./redis')

require('dotenv').config({path:'./.env'})

const PORT = process.env.PORT

app.use(express.json())

app.use(routes.productoRoute)
app.use(routes.fabricanteRoute)
app.use(routes.componenteRoute)



app.listen(PORT, async ()=>{
    //await redisClient.connect()
    await sequelize.authenticate()
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
    db.sequelize.sync({force:true})
})

//docker run --name redis-server -p 6379:6379 -d redis
//comando a correr previamente para que pueda levantar redis