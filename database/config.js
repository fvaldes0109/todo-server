const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        console.log("Connecting to the database...");

        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database is online');
        
    } catch (error) {
        console.log(error);   
        throw new Error('Error connecting to the DB');
    }
}

module.exports = dbConnection;