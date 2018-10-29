var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

// 渲染店铺列表
router.get('/:id', async function (req, res) {
    let {owner}=req.quary;
    let data = await client.get('/stores' , { owner,submitType: 'findJoin', ref: ['orders','users']});
    res.send(data);
});
module.exports = router;