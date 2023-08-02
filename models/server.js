const express = require('express');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.tasksPath = '/api/tasks'

        this.routes();
    }
    
    routes() {
        this.app.use(this.tasksPath, require('../routes/tasks'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

module.exports = Server;