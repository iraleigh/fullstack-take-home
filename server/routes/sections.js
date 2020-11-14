const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();

router.get('/:sectionId/enrollment', async (req, res) => {
    const { sectionId } = req.params;
    const { rows } = await db.query('SELECT * FROM users INNER JOIN enrollment ON users.id = enrollment.userId WHERE enrollment.sectionId = $1', [sectionId]);
    const users = rows.map(user => {
        user.name = user.name.trim();
        return user;
    })
    res.json(users);
});

module.exports = router;