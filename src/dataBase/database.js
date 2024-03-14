const mongoose = require('mongoose');
// const URI = 'mongodb://localhost/liveDlc';
const URIA = 'mongodb+srv://dbLive:ZY6qtwXiyJZT9uiF@cluster0.4mici.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// mongodb+srv://dbLive:ZY6qtwXiyJZT9uiF@cluster0.4mici.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://dbLive:ZY6qtwXiyJZT9uiF@cluster0.4mici.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// 608c0ea2cbe51b3d1db360c3
// 'ZY6qtwXiyJZT9uiF'
// process.env.MONGODB_URI
mongoose.connect(URIA, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('db is conected'))
    .catch(error => console.error(error));

module.exports = mongoose;

// mongodb+srv://dbLive:<password>@cluster0.4mici.mongodb.net/