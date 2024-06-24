// Sample

// Init function
/**
 * @param {object} app - Modified express app
 * @param {object} jakhu - Jakhu api
 * @param {function} done - done function
 */
function init(app, jakhu, done) {
    // App logic
    jakhu.use(function o(req, res, next) {
        console.log("Got request!");
        next();
    })
}
module.exports = {
    init: init
}