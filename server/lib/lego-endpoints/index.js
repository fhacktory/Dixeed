'use strict';

const handlers = require('./handlers');
const Joi = require('joi');
const DIRECTIONS = require('./constant').DIRECTIONS;

module.exports = function register(server, options, next) {
    server.route({
        method: 'POST',
        path: '/move',
        handler: handlers.move,
        config: {
            validate: {
                payload: {
                    action: Joi.string().required().lowercase().valid([
                        DIRECTIONS.UP,
                        DIRECTIONS.DOWN,
                        DIRECTIONS.LEFT,
                        DIRECTIONS.RIGHT
                    ]).options({ convert: true })
                }
            }
        }
    });

    next();
};

module.exports.attributes = {
    name: 'lego-endpoints',
    version: '1.0.0'
};