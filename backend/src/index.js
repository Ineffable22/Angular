const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const corsOption = {
    origin: ['http://localhost:4200'],
};
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');

const app = express();
const port = process.env.PORT || 9000;
app.use(cors(corsOption));


// middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', loginRoutes);

// routes
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

// mogodb connection
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error));

app.listen(port, () => console.log('server listening on port', port));
