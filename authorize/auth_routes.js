const router = require("express").Router();
const AuthorizeController = require("./AuthorizeController");

router.post('/user', AuthorizeController.register);