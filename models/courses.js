const mongoose = require('mongoose')

const cursosSchema = new mongoose.Schema({
    title: String,
    modules: [
        {
            module: String,
            syllabus:[
                {
                    topic: String,
                    videoLink: String
                }
            ]
        }
    ],
    description: String,
    image: String,
    instructor: String,
});

const Course = mongoose.model('Courses', cursosSchema)

module.exports = Course;