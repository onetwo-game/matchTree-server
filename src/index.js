const { listen } = require("@colyseus/tools");

// Import arena config
const app = require("./app.config");

const port = parseInt(process.env.PORT, 10) || 2567;
console.log('11', port)
// Create and listen on 2567 (or PORT environment variable.)
listen(app, port);
