const express = require('express');
const { isValidObjectId } = require('mongoose');
const dataStateApp = require('../models/dataStateApp');
const { findById, populate } = require('../models/player');
const Player = require('../models/player');
const DataStateApp = require('../models/dataStateApp');
const router = express.Router();

//routes for state data table

// router.put('/update', async () => {

// })


// routes for update datble
router.get('/getData', async (req, res) => {
  console.log('me ejecute')
    const player = await Player.find().then((player)=>res.json(player));
    console.log('this my playyer data', Player)
    // res.json(player);
    res.json({'data': {'data': 'data'}});
})

router.get('/update/:id', async (req, res) => {
  const rta = await Player.findById({_id: req.params.id});
  res.json(rta)
})

router.post('/postData', async(req, res) => {
    const {nombre, puntaje} = req.body;
    const data = new Player({
      // _id,
      numCarrera,
      nombre,
      puntaje  
    });
    const rta = await data.save();
    console.log('rtaPost', rta)
    res.json({status: 'Task Saved'});
})
router.put('/:id', async(req, res )=>{
  const {numCarrera, nombre, puntaje} = req.body;
  console.log('this update', req.params.id)
  console.log('data', req.body)
  const newData = new Player({
    numCarrera,
    nombre,
    puntaje
  }); 
  await Player.findOneAndUpdate( {_id: req.params.id}, newData)
  res.json({status: 'update data'})
})



router.post('/stateData', async (req, res) => {

  const { stateLive } = req.body

  const dataStateApp = new DataStateApp({
    stateLive
  })

  let rta = await dataStateApp.save()
  if(rta){
    res.json({
      status: 'success'
    })
  }else {
    res.json({
      status: 'error'
    })
  }

})

router.get('/stateLive', async(req, res)=>{
  const stateLive = await DataStateApp.find()
  if(stateLive){
    res.json(stateLive);
  }else {
    res.json({stateLive: error});
  }
})

module.exports = router;