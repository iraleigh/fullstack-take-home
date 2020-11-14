const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();

router.get('/', async (req, res) => {
    const name = req.query.name;
    const { rows } = await db.query('SELECT * FROM users WHERE name = $1', [name]);
    let user = rows[0];
    user.name = user.name.trim();
    res.json(rows[0]);
});

router.get('/:userId/sections', async (req, res) => {
    const { userId } = req.params;
    const { rows } = await db.query('SELECT * FROM enrolLment WHERE userId = $1', [userId]);
    res.json(rows);
});

router.get('/:userId/sections/:sectionId', async (req, res) => {
    const { userId, sectionId } = req.params;
    const { rows } = await db.query('SELECT * FROM enrollment WHERE userId = $1 AND sectionId = $2', [userId, sectionId]);
    res.json(rows[0]);
});

router.post('/:userId/sections/:sectionId', async (req, res) => {
    const { userId, sectionId } = req.params;
    await db.query('INSERT INTO enrollment (userId, sectionId) VALUES ($1, $2)', [userId, sectionId]);
    res.status(201).end();
});

router.delete('/:userId/sections/:sectionId', async (req, res) => {
    const { userId, sectionId } = req.params;
    await db.query('DELETE FROM enrollment WHERE userId = $1 AND sectionId = $2', [userId, sectionId]);
    res.status(200).end();
});

module.exports = router;