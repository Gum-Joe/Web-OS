'use strict'
/*
 * Api methods
 */
/*
 * Module dependencies
 */
const debug = require('debug')('api');
const io = require('socket.io/node_modules/socket.io-client').connect('http://localhost:8080');

// Api exports
let api = module.exports = {};
// Verify colours
const verifyColour = (colour) => {
        if (colour !== 'blue' && colour !== 'green' && colour !== 'red' && colour !== 'yellow' && colour !== 'light-blue') {
            throw new Error('Unreconised colour. Please use blue, green, red, yellow or light-blue');
        }
        const prefix = "progress-bar progress-bar"
        if (colour === 'blue') {
            return `${prefix}-primary`
        }
        if (colour === 'green') {
            return `${prefix}-success`
        }
        if (colour === 'red') {
            return `${prefix}-danger`
        }
        if (colour === 'yellow') {
            return `${prefix}-warning`
        }
        if (colour === 'light-blue') {
            return `${prefix}-info`
        }
    }
    /**
     * Task class
     * @param name {String} Name of task
     * @param colour {String} Colour of progress bar
     */
function Task(name, description, colour) {
    this.task = {};
    this.task.name = name;
    if (typeof colour === 'undefined') {
        this.task.colour = "progress-bar progress-bar-primary"
    } else {
        this.task.colour = verifyColour(colour);
    }
    this.task.description = description;
    this.task.id = Math.round(Math.random() * 100)
    this.task.percent = 0;
}
/**
 * Deploy method
 */
Task.prototype.deploy = function() {
    io.emit('task', this.task);
};

/**
 * Api class
 */
function Api() {
    this.tasks = {};
}

Api.prototype.addTask = (name, colour, description) => {
    return new Task(name, colour, description);
};
/**
 * INIT method
 */
api.init = () => {
    debug("Initializing api...")
        // Create middleware
    return new Api()
}
