const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");

const app = express();
dotenv.config();
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
app.use('/user', userHandler);


//default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ err: err });
}

app.use(errorHandler);

app.listen(5000, () => {
    console.log(`listening on 5000`)
})