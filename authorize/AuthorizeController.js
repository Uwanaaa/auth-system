const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userModel = require('../models/user');
const { role, jwt, jwtExpirationInSeconds, jwtSecret } = require('../config');

//Function to generate access token for each user
const generateToken = (username, userId) => {
    return jwt.sign({
        "alg": "HS256",
        "typ": "JWT"
    }, {
        userId,
        username,
    }, {
        jwtSecret,
    }, {
        expiresIn: jwtExpirationInSeconds,
    });
};

const encryptPassword = (password) => {
    const hashed = crypto.createHash("sha256");
    hashed.update(password);
    return hashed.digest("hex");
};


module.exports = {

    //Registering user and encrypting their password
    register: (req, res) => {
        const data = req.body;

        let encryptedPassword = encryptPassword(data.password);
        let role = data.role;

        if (!role) {
            role = role.USER;
        }

        //Function to create a new user
        userModel.createUser(
                Object.assign(data, { password: encryptedPassword, role })
            )
            .then((user) => {
                //Generating an access code//
                const accessToken = generateToken(data.username, user.id);

                return res.status(200).json({
                    status: true,
                    result: {
                        user: user.toJSON(),
                        token: accessToken,
                    },
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    login: (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return "This user does not exist but you can make one =)"
        };
        userModel.findUser({ username })
            .then((user) => {

                if (!user) {
                    return res.status(400).json({
                        status: 'failed',
                        error: 'This user does not exist',
                    });
                }

                const encryptedPassword = encryptPassword(password);

                if (user.password !== encryptedPassword) {
                    return res.status(400).json({
                        status: 'failed',
                        error: {
                            message: 'The password or username is incorrect',
                        },
                    });
                };

                const AccessToken = generateToken(username, user.id);

                return res.status(200).json({
                    status: true,
                    data: {
                        user: user.toJSON(),
                        token: accessToken,
                    },
                });
            }).catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },
};