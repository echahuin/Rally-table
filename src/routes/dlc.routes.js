const express = require('express')


const router = express.Router();

router.get('/data', async (req, res) => {
    console.log('enviado')
    // console.log('this is res ',res)
    await res.send('hi')// res.json({status: 'Task Updated'});
})

module.exports = router;