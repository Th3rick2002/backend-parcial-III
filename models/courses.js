const mongoose = require('mongoose')

const cursosSchema = new mongoose.Schema({
    title: String,
    modules: {
        module1: [
            {
                title: String,
                videoLink: String,
            },
        ],
        module2: [
            {
                title: String,
                videoLink: String
            }
        ],
    },
    description: String,
    image: String,
    instructor: String,
});

const Course = mongoose.model('Courses', cursosSchema)

module.exports = Course;