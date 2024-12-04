const redis = require('redis')

const cliente = redis.createClient({
    url: 'redis://localhost:6379'
})

cliente.on('connect', ()=>{
    console.log('Conectado a Redis')
})

cliente.on('error', (err)=>{
    console.error('Error en conectar a Redis',err)
})

cliente.connect()

module.exports = cliente