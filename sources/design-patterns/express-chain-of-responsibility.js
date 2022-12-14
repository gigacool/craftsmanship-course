
{
    const express = require('express');
    const app = express();
    
    app.get('/api', function(req, res, next){
        req.send('ok');
    })
    
    app.listen(3000);
}


{
    const express = require('express');
    const app = express();
 
    let counter = 0;
    const requestNumber = function(req, res, next){
        req.counter = ++counter;
        next()
    }
    app.use(requestNumber);

    const logger = function(req, res, next){
        console.log('log', req.params.id);
        next();
    }
    app.use(logger);

    const authorize = function(req, res, next){
        if (/* requester isAuthorized */){
            return next();
        }
        res.status(401)
    }
    app.use('/api', authorize);

    app.get('/api/:id', function(req, res, next){
        // is called after logger
        req.send(req.params.id);
    })
    
    app.listen(3000);
}