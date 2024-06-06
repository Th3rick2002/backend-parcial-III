const express = require('express');
const router = express.Router();
const Course = require('../models/courses');

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        modules: req.body.modules.map(module => ({
            module: module.module,
            syllabus: module.syllabus.map(item => ({
                topic: item.topic,
                videoLink: item.videoLink
            }))
        })),
        description: req.body.description,
        image: req.body.image,
        instructor: req.body.instructor
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', getCourse, (req, res) => {
    res.json(res.course);
});

// Middleware para obtener un curso por ID
async function getCourse(req, res, next) {
    let course;
    try {
        course = await Course.findById(req.params.id);
        if (course == null) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.course = course;
    next();
}

// Ruta PUT para actualizar un curso por ID
router.put('/:id', getCourse, async (req, res) => {
    if (req.body.title != null) {
        res.course.title = req.body.title;
    }
    if (req.body.modules != null) {
        res.course.modules = req.body.modules.map(module => ({
            module: module.module,
            syllabus: module.syllabus.map(item => ({
                topic: item.topic,
                videoLink: item.videoLink
            }))
        }));
    }
    if (req.body.description != null) {
        res.course.description = req.body.description;
    }
    if (req.body.image != null) {
        res.course.image = req.body.image;
    }
    if (req.body.instructor != null) {
        res.course.instructor = req.body.instructor;
    }

    try {
        const updatedCourse = await res.course.save();
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta DELETE para eliminar un curso por ID
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (course == null) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json({ message: 'Curso eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;