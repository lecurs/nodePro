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

// 获取制定门店
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/stores');
    data=_.filter(data,function(item){
        return item._id==id
    })
    res.send(data);
});

// 获取门店商品
router.get('/myGoods/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/goods',{submitType: 'findJoin', ref: 'stores'});
    data=_.filter(data,function(item){
        return item.stores._id==id
    })
    res.send(data);
});

// 获取门店服务
router.get('/myServices/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/services',{submitType: 'findJoin', ref: 'stores'});
    data=_.filter(data,function(item){
        return item.stores._id==id
    })
    res.send(data);
});
module.exports = router;