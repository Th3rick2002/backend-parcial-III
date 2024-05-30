const express = require('express');
const mongoose = require('mongoose');
const app = express();
//const Courses = require('./routes/routes');
const port = 3000;

const mongoUrl = 'mongodb://localhost:27017/coursesdb';

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
        const db = mongoose.connection.db;
    })
    .catch(err => console.error('Could not connect to MongoDB', err));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//app.use('/courses');
