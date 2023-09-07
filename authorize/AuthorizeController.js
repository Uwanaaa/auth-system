module.exports = {
    register: (req, res) => {
        const data = req.body;

        let encryptedPassword = encryptPassword(data.password);
        let role = data.role;

        if (!role) {
            role = roles.USER;
        }

        UserModel.createUser(
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
                })
            })
    }
}