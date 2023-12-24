const express = require('express');


const app = express();



const errorHandler = (err, req, res, next) => {
    if (err.headersSent) {
        return next(err);
    }
    res.status(500).json({ err: err });
}

app.listen(3000, () => {
    console.log(`listening on 3000`)
})