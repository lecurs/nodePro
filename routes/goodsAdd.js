var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");
const _ = require("lodash");

router.get('/getOwner', async function (req, res) {
    let id = req.query.userId ;
    console.log(id)
    let data = await client.get('/owners',{ submitType: 'findJoin', ref: 'users' });
    data = _.filter(data, function (item) {
        return item.users._id == id
    })
    res.send(data[0]._id);
});

module.exports = router;