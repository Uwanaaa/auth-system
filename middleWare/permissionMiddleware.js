const userModel = require('../models/user.js');

module.exports = {
    has: (role) => {
        return (req, res, next) => {
            const { user: { userId } } = req;

            userModel.findUser({ id: userId }).then((user) => {
                if (!user) {
                    return res.status(403).json({
                        status: 'failed',
                        error: {
                            'message': 'Invalid Access Token'
                        }
                    });
                }
            })

            const userRole = user.role;

            if (userRole !== role) {
                return res.status(403).json({
                    status: 'failed',
                    error: {
                        'message': 'Access is forbidden',
                    },
                });
            }
            next();
        };
    }
};