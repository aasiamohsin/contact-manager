// Import Express
const express = require('express');

// Import connectDB from db file
const connectDB = require('./config/db');

// Importing routes
const userRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const contactsRoute = require('./routes/api/contacts');

// Initialize express 
const app = express();

// Connect to MOngoDB
connectDB();

// Initializing middleware
app.use(express.json({extended: false}))

// App respond with the message to the root path
app.get('/', (req, res) => res.json({
    msg: 'Welcome to contact manager API'
}));

// Define routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/contacts', contactsRoute);

// Initializing port for production OR development 
const PORT = process.env.PORT || 5000;

// App starts a server and listen on port
app.listen(PORT, () => console.log(`server started on ${PORT}`));  