const crypto = require('crypto');
const secret = crypto.randomBytes(10).toString('hex');

module.exports = {
    port: 2005,
    tokenSecret: secret,
    jwtExpirationInSeconds: 60 * 60, //1 hour
    role: {
        USER: 'user',
        ADMIN: 'admin',
    },
    priceUnit: {
        DOLLAR: 'dollar',
        EURO: 'euro',
        NAIRA: 'naira',
    },
};