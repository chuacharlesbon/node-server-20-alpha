////////////////////////////
// DEPENDENCIES           //
////////////////////////////

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config();

////////////////////////////
// ROUTES                 //
////////////////////////////

const myRoute = require('./routes/myRoute');

////////////////////////////
// APP & MONGODB          //
////////////////////////////

const app = express();

const port = 4000;

const mongoDbUri = process.env.MONGODB_URI || "N/A";

mongoose.connect(mongoDbUri.toString(),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());

app.use(cors());

app.use('/myRoute', myRoute);

app.listen(port, () => {
    console.log(`Server is now running at port ${port}.`);
})