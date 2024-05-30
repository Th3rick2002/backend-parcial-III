const mongoose = require('mongoose')

const cursosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    modules: {
        type: {
            topic1: String,
            topic2: String,
        },
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL de la imagen
        required: true
    },
    instructor: {
        type: String,
        required: true
    }
});

const Course = mongoose.model('Course', cursosSchema)

module.exports = Course;