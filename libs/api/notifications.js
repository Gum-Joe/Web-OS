'use strict';
const sio = require('socket.io');
let lib = module.exports = {};
/**
 * Send a notification
 * @param text {String} Text for notification
 * @param glyph {String} Glyph for notification
 */
lib.emit = (app, text, glyph) => {
    return `<i class="fa ${glyph} fa-fw"></i> ${text}`;
}