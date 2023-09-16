const { DataTypes, Sequelize } = require('sequelize');
const { role } = require('../config.js');

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: role.USER,
    },
};

module.exports = {
    initializeModel: () => {
        const sql = sequelize.define('user', UserModel);
    },

    createUser: (user) => {
        return sql.create(user);
    },

    deleteUser: (query) => {
        return this.model.destroy({
            where: query,
        });
    },

    findUser: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    findAllUser: (query) => {
        return this.model.findAll({
            where: query,
        });
    },

    updateUser: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },
};