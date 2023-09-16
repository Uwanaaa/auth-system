const Ajv = require('ajv').default;
const options = { allErrors: true };

module.exports = {

    /**
     * @description This check if the given in the correct format 
     * @param {Object} schema - This the schema to validated against
     * @returns {Function} - Handles the data in the request header
     */
    verify: (schema) => {

        //Checking if schema is provided
        if (!schema) {
            throw new Error('There is schema provided');
        }

        //Creating validator to compare given data to the schema
        else {
            return (res, req, next) => {
                const ajv = new Ajv(options);
                const { body } = req;
                const validator = ajv.compile(schema);
                const validated = validator(body);

                //Goes to the next page if given data is validated and if not an error is thrown
                if (validated) {
                    next();
                } else {
                    return res.send({
                        status: 'failed',
                        error: {
                            'message': `${ajv.errorsText(validated.error)}`,
                        }
                    })
                }
            };
        }
    }
};