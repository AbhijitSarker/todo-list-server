const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
app.use(express.json());

//db connection
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qeddfku.mongodb.net/todos?retryWrites=true&w=majority`, {
    useNewUrlParser: true,

    useUnifiedTopology: true
})
    .then(() => console.log('connection established'))
    .catch(err => console.log(err))


const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ err: err });
}

app.listen(5000, () => {
    console.log(`listening on 3000`)
})