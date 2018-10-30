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

// 获取指定门店
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/stores');
    data=_.filter(data,function(item){
        return item._id==id
    })
    res.send(data);
});

// 获取门店商品
router.get('/goodsOfStore/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/goods',{submitType: 'findJoin', ref: ['stores','owners']});
    data=_.filter(data,function(item){
        return item.stores._id==id
    })
    res.send(data);
});

// 获取门店服务
router.get('/servicesOfStore/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/services',{submitType: 'findJoin', ref: 'stores'});
    data=_.filter(data,function(item){
        return item.stores._id==id
    })
    res.send(data);
});

// 获取店主商品
router.get('/getMyGoods/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/goods',{submitType: 'findJoin', ref: ['stores','owners']});
    data=_.filter(data,function(item){
        return item.owners._id==id
    })
    res.send(data);
});

// 添加门店商品
router.get('/goodsOfStores/:id', async function (req, res) {
    let id = req.params.id;
    let {storeId}=req.query;
    console.log(storeId);
    let data = await client.get('/goods/'+id);
    let ary=_.filter(data.stores,function(item){
        return item.$id==storeId;
    });
    console.log(ary)
    if(ary.length==0){
        data.stores.push({$ref:'stores',$id:`Objected("${storeId}")`})
        await client.put('/goods/'+id,{stores:data.stores});
    }
    res.send('suc');
});
module.exports = router;