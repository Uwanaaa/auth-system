const { Router } = require('express');
const user = require('./user.js');

Router.post('/login', user.createUser);