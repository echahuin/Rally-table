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
      nombre,
      puntaje  
    });
    const rta = await data.save();
    console.log('rtaPost', rta)
    res.json({status: 'Task Saved'});
})
router.put('/:id', async(req, res )=>{
  const {nombre, puntaje} = req.body;
  console.log('this update', req.params.id)
  console.log('data', req.body)
  const newData = new Player({
    nombre,
    puntaje
  }); 
  // const rta = await Player.findById({_id: req.params.id})
  // console.log('this now', rta)
  await Player.findOneAndUpdate( {_id: req.params.id}, newData)
  res.json({status: 'update data'})
})

// router.put('/:id', async (req, res) => {
//   const { title, description } = req.body;
//   const newTask = {title, description};
//   await Task.findByIdAndUpdate(req.params.id, newTask);
//   res.json({status: 'Task Updated'});
// });

module.exports = router;