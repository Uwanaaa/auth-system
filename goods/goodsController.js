const { error } = require('ajv/dist/vocabularies/applicator/dependencies');
const GoodsModel = require('../models/goods');

module.exports = {
    getAllGoods: (req, res) => {
        const { query: filter } = req;

        GoodsModel.findAllGoods(filter)
            .then((goods) => {
                return res.status(200).json({
                    status: 'failed',
                    data: goods
                })
            }).catch((error) => {
                return res.status(500).json({
                    status: 'failed'
                })
            });
    }
}