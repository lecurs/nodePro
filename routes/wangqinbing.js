var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");


module.exports = router;