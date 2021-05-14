
const express = require('express')
const morgan = require('morgan');
const path =require('path')
const { mongoose } = require('./src/dataBase/database');
const Player =  require('./src/models/player')
// const webpack  = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackConfig = require('./webpack.config');

const app = express()

// mongoose.set('useFindAndModify', false);
app.set('port', process.env.PORT || 3000)

// midelweares ---> funciones que se ejecutan antes
app.use(morgan('dev')); // ver en mi consola, las peticiones 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public') ))
app.use(express.urlencoded({extended: false}))
// app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use('', require('./src/routes/dlc.routes'))


const server = app.listen(app.get('port'), ()=>{
    console.log(`estamos dentro del server, ${app.get('port')}`)
})

// console.log('this server',server)

const socketIo = require('socket.io');
const player = require('./src/models/player');
const io = socketIo(server)


  // const rta = await Player.findById({_id: req.params.id})
  // console.log('this now', rta)
//   

// web socket 
io.on('connection', async(socket)=>{
   
    socket.on('message', async(player)=>{
     
        const data = await Player.find();
        socket.broadcast.emit('message', data)
        console.log('new conection player', player)
    })
});
 