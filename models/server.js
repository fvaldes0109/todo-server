const express = require('express');
const cors = require('cors');

const dbConnection = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.tasksPath = '/api/tasks';
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        this.dbStart();
        
        this.middlewares();

        this.routes();
    }
    
    async dbStart() {
        await dbConnection();
    }

    middlewares() {
        
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }   

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.tasksPath, require('../routes/tasks'));
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

module.exports = Server;