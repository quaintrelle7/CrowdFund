const {createServer} = require('http');
const next = require('next');

//Node_Env is global environemnt variable, using it 
//We look if the server is in the production

const app = next({ 
    dev: process.env.NODE_ENV !== 'production'

});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(()=>{
    createServer(handler).listen(3000, (err)=>{
        if(err) throw err;
        console.log("Ready on localhost:3000");
    })
})
