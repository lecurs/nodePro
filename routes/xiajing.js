var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

router.get('/', async function (req, res) {//增加
    // let params = req.body; 
    // await client.post("/students/", params);
    res.send("suc");

});

module.exports = router;