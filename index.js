
const express = require('express')
const morgan = require('morgan');
const path =require('path')
const { mongoose } = require('./src/dataBase/database');
const Player =  require('./src/models/player')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev')); // ver en mi consola, las peticiones 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public') ))
app.use(express.urlencoded({extended: false}))

app.use('', require('./src/routes/dlc.routes'))

const server = app.listen(app.get('port'), ()=>{
    console.log(`estamos dentro del server, ${app.get('port')}`)
})

// console.log('this server',server)

const socketIo = require('socket.io');
const player = require('./src/models/player');
const io = socketIo(server)

// web socket 
io.on('connection', async(socket)=>{

    socket.on('active', async(play)=>{
      console.log('aaaaaaaaaaaaaa')
        const data = await Player.find();
        socket.broadcast.emit('message', data)
        console.log('new', play)
    })
    // const data = await Player.find();
    // socket.broadcast.emit('message', data)

    socket.on('message', async(player)=>{
     
        const data = await Player.find();
        socket.broadcast.emit('message', data)
        console.log('new conection player', player)
    })
    
    
});
 