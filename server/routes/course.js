const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();

router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM courses', []);
    const courses = rows.map(course => {
        course.name = course.name.trim();
        return course;
    })
    res.json(courses);
});

router.get('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    const { rows } = await db.query('SELECT * FROM courses WHERE id = $1', [courseId]);
    const courses = rows.map(course => {
        course.name = course.name.trim();
        return course;
    })
    res.json(courses[0]);
});

router.get('/:courseId/sections', async (req, res) => {
    const { courseId } = req.params;
    const { rows } = await db.query('SELECT * FROM sections WHERE courseId = $1', [courseId]);
    const sections = rows.map(section => {
        section.nickname = section.nickname.trim();
        return section;
    })
    res.json(sections);
});

router.get('/:courseId/sessions', async (req, res) => {
    const { courseId } = req.params;
    const { rows } = await db.query('SELECT * FROM sessions WHERE courseId = $1', [courseId]);
    const sessions = rows.map(session => {
        session.name = session.name.trim();
        return session;
    })
    res.json(sessions);
});

const trimField = (obj, field) => {
    obj[field] = obj[field]
}

module.exports = router;