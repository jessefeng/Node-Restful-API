const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const productRoutes  = require('./api/routes/products');
const orderRoutes  = require('./api/routes/orders');
const requestLog = require('./log/requestLog');

//MongoDB connection
mongoose.connect(`mongodb+srv://jingzhe:${process.env.MONGO_ATLAS_PW}@jingzhe-website-p7usg.mongodb.net/website?retryWrites=true`,
    {
        useNewUrlParser: true
    }
);

//Handler Log File
requestLog(app);

//middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Res Header
app.use((req,res,next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
   if(req.method === 'OPTIONS'){
       res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
       return res.status(200).json({});
   }
   next();
});

//Handler Request Routing
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

//Error handling for invalida request
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//General Error Handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
