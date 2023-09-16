const { role } = require('../../config.js');
module.exports = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
        },

        password: {
            type: 'string',
        },

        email: {
            type: 'string',
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        },

        age: {
            type: 'number',
            minimum: 0,
        },

        firstName: {
            type: 'string',
        },

        lastName: {
            type: 'string',
        },

        role: {
            type: 'string',
            enum: Object.values(role),
        },
    },

    required: ['username', 'password', 'email', 'age', 'firstName', 'lastName', 'role'],

    additionalProperties: false,
};