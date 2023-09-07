const { Router } = require('express');
const user_control = require('./user-control');

Router.post('/users', user_control.getAllUsers);