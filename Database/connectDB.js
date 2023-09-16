const { Sequelize } = require('sequelize');

const database = new Sequelize('database_name', 'uwana', 'password', {
    host: 0000,
    dialect: 'postgres',
});

database.authenticate().then(() => {
    console.log('Database has connected successfully');
}).catch((err) => {
    console.error(`The database did not connects because of ${err}`);
})