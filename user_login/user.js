module.exports = {
    initialize: (sequelize) => {
        this.model = sequelize.define("user", UserModel);
    },

    createUser: user => this.model.create(user),
};