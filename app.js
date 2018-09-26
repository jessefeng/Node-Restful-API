const express = require('express');
const app = express();
const workingExprienceRoutes = require('./api/routes/workingExprience');
const lifeMomentsRoutes = require('./api/routes/lifeStyle');
const requestLog = require('./log/requestLog');

//Handler Log File
requestLog(app);

//Handler Request Routing
app.use('/api/resume', workingExprienceRoutes);
app.use('/api/life', lifeMomentsRoutes);

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