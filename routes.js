//Second set of parentheses means that 
// require statement returns a function

//To set the routes dynamically

const routes = require('next-routes')();

routes
.add('/campaigns/new', '/campaigns/new')
.add('/campaigns/:address', '/campaigns/show')
.add('/campaigns/:address/requests', '/campaigns/requests/index')
.add('/campaigns/:address/requests/new', '/campaigns/requests/new');


module.exports = routes;