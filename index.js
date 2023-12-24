const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const todoHandler = require("./routeHandler/todoHandler");

const app = express();
app.use(express.json());

//db connection
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qeddfku.mongodb.net/todos?retryWrites=true&w=majority`, {
    useNewUrlParser: true,

    useUnifiedTopology: true
})
    .then(() => console.log('connection established'))
    .catch(err => console.log(err))


//application routes
app.use('/todo', todoHandler);

//default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ err: err });
}

app.listen(5000, () => {
    console.log(`listening on 3000`)
})