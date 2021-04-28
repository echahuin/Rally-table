
const express = require('express')
const morgan = require('morgan');
const path =require('path')


// const webpack  = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackConfig = require('./webpack.config');

const app = express()


app.set('port', process.env.PORT || 3000)

// midelweares ---> funciones que se ejecutan antes
app.use(morgan('dev')); // ver en mi consola, las peticiones 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public') ))
app.use(express.urlencoded({extended: false}))
// app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use('/home', require('./src/routes/dlc.routes'))


const server = app.listen(app.get('port'), ()=>{
    console.log(`estamos dentro del server, ${app.get('port')}`)
})

// console.log('this server',server)

const socketIo = require('socket.io')
const io = socketIo(server)

// web socket 
io.on('connection', ()=>{
    console.log('new conection')
});
