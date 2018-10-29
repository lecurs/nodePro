var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

router.get('/',async function(req,res) {
    let data =await client.get('/orders',{submitType: 'findJoin', ref: 'stores'})
    res.send(data)
})

module.exports = router;