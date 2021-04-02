// Import Mongoose
const mongoose = require('mongoose');
// Import config
const config = require('config');

// Importing mongoURI for monogDB connection
const db = config.get('mongoURI');

// Function to connect with MongoDB
const connectDB = async () => {
     try {
         await mongoose.connect(db, {
            // Parameters to avoid warnings
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log('MongoDB is connected.')
    }
    catch(err) {
        console.error(err.message);
        process.exit(1);
    };
};

module.exports = connectDB;