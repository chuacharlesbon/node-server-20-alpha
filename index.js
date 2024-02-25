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

////////////////////////////
// Test Upload            //
////////////////////////////

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const MyFile = require('./models/MyFile');

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const newFile = new MyFile({
            filename: file.originalname,
        });

        await newFile.save();
        res.json({ message: 'File uploaded successfully!', file: newFile});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error uploading file' });
    }
});

app.listen(port, () => {
    console.log(`Server is now running at port ${port}.`);
})