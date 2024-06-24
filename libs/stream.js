var Stream = require('stream').Stream;
var req = new Stream;
req.readable = req.writable = true;
module.exports = {
    req: req
};