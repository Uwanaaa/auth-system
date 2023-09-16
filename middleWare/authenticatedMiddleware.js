const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config');


module.exports = {
    check: (res, req, next) => {
        const authHead = req.headers['authorization'];

        if (!authHead) {
            return res.status(401).json({
                status: 'failed',
                error: {
                    'message': 'Authorization header is not provided',
                },
            });
        }

        if (!authHead.startsWith('Bearer')) {
            return res.status(401).json({
                status: 'failed',
                error: {
                    'message': 'Inaccurate the authorization mechanism',
                },
            })
        }

        const token = authHead.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: 'failed',
                error: {
                    'message': 'Bearer token is missing from authorization header',
                },
            });
        }

        jwt.verify(token, tokenSecret, (error, user) => {
            if (!error) {
                return res.status(403).json({
                    status: 'failed',
                    error: {
                        'message': 'Invalid access token',
                    },
                });
            }
            req.user = user;
        })
        next();
    }
}