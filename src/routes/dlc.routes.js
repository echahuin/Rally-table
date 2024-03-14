const express = require('express');
const Player = require('../models/player');
const DataStateApp = require('../models/dataStateApp');
const router = express.Router();

// routes for update datble
router.get('/getData', async (req, res) => {
    const player = await Player.find().then((player)=>res.json(player));
    res.json(player);
})



router.get('/update/:id', async (req, res) => {
  const rta = await Player.findById({_id: req.params.id});
  res.json(rta)
})



router.post('/postData', async(req, res) => {
    const {nombre, puntaje} = req.body;
    const data = new Player({
      numCarrera,
      nombre,
      puntaje  
    });
    const rta = await data.save();
    res.json({status: 'Task Saved'});
})



router.put('/:id', async(req, res )=>{
  const {numCarrera, nombre, puntaje} = req.body;
  const newData = new Player({
    numCarrera,
    nombre,
    puntaje
  }); 
  const rpta = await Player.findOneAndUpdate( {_id: req.params.id}, newData)
  res.json({rpta})
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