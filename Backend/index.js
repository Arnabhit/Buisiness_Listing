const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure this is installed
const { connectDb } = require('./Connection/connection');
const User = require('./Models/User');
const userrouter = require('./Routes/user');
const businessrouter = require('./Routes/Business');
const retrievebusinessrouter=require('./Routes/BusinessRetrieve');
const reviewsrouter = require('./Routes/Reviews');
const cookieparser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());// middleware to parse json bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

connectDb("mongodb+srv://arnab:ARNABBARUA@cluster0.fenh9vq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Business")
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Error connecting to DB", err);
    });


app.get('/home', (req, res) => {
    res.send('Hello World');
});

app.use("/api", userrouter);
app.use("/api/business", businessrouter);
app.use("/api/retrievebusiness",retrievebusinessrouter);
app.use('/api/reviews', reviewsrouter);

app.get('/api/location', async (req, res) => {
    const { query } = req.query;
    const API_KEY = 'AIzaSyADU2oVdZe0diSR1N2GOmABf_tVx4Xobkk'; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching location suggestions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
