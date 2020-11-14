const users = require('./user');
const courses = require('./course');
const sections = require('./sections');

module.exports = app => {
    app.use('/sections', sections);
    app.use('/courses', courses);
    app.use('/users', users);
};