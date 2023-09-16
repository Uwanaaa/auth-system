const { DataType } = require('sequelize');
const { priceUnit } = require('../config.js');


const GoodsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    priceUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: priceUnit.NAIRA,
    },
};

module.exports = {
    initalize: (sequelize) => {
        this.model = sequelize.define('goods', GoodsModel);
    },

    createGood: (goods) => {
        return this.model.create(goods);
    },

    deleteGood: (query) => {
        return this.model.destroy({
            where: query,
        });
    },

    findGood: (query) => {
        return this.model.findOne({
            where: query,
        });
    },

    findAllGoods: (query) => {
        return this.model.findAll({
            where: query,
        });
    },

    updateGood: (query, updatedValue) => {
        return this.model.update(updatedValue, {
            where: query,
        });
    },
};