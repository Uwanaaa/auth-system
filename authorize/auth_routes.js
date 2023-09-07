const { Router } = require("express");
const AuthorizeController = require("./AuthorizeController");

Router.post('/user', AuthorizeController.register);