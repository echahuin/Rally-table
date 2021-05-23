const express = require('express');
const { isValidObjectId } = require('mongoose');
const { findById } = require('../models/player');
const Player = require('../models/player');
const router = express.Router();

router.get('/getData', async (req, res) => {
    const player = await Player.find();
    res.json(player);
})

router.get('/update/:id', async (req, res) => {
  const rta = await Player.findById({_id: req.params.id});
  res.json(rta)
})

router.post('/postData', async(req, res) => {
  console.log('postDAta', req.body) 
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


module.exports = router;