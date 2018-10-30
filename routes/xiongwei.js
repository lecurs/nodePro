var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");
const _ =require("lodash");

// 渲染店铺列表
router.get('/', async function (req, res) {
    let { ownerId } = req.query;
    // let data = await client.get('/stores', { ownerId, submitType: 'findJoin', ref: ['orders', 'users'] });
    let data = await client.get('/stores');
    data=_.filter(data,function(item){
        return item.owner==ownerId
    })
    res.send(data);
});

router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/stores');
    data=_.filter(data,function(item){
        return item.owner==id
    })
    res.send(data);
});
module.exports = router;