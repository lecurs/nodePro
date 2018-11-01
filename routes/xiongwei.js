var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");
const _ = require("lodash");

// 渲染店铺列表
router.get('/', async function (req, res) {
    let { ownerId } = req.query;
    let data = await client.get('/stores');
    data = _.filter(data, function (item) {
        return item.owner == ownerId&&item.passed=="1"
    })
    res.send(data);
});

// 获取店主
router.get('/getOwner', async function (req, res) {
    let id = req.query.userId ;
    let data = await client.get('/owners',{ submitType: 'findJoin', ref: 'users' });
    data = _.filter(data, function (item) {
        return item.users._id == id
    })
    res.send(data[0]._id);
});

// 获取指定门店
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/stores');
    data = _.filter(data, function (item) {
        return item._id == id
    })
    res.send(data);
});

// 获取门店商品
router.get('/goodsOfStore/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/stores/' + id);
    res.send(data.goods);
});

// 获取门店服务
router.get('/servicesOfStore/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/stores/' + id);
    res.send(data.services);
});

// 获取店主商品
router.get('/getMyGoods/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/goods', { submitType: 'findJoin', ref: 'owners' });
    data = _.filter(data, function (item) {
        return item.owners._id == id
    });
    res.send(data);
});

// 获取店主服务
router.get('/getMyServices/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/services', { submitType: 'findJoin', ref: 'owners' });
    data = _.filter(data, function (item) {
        return item.owners._id == id
    });
    res.send(data);
});

// 添加门店商品
router.put('/addGoods/:id', async function (req, res) {
    let storeId = req.params.id;
    let { id } = req.body;
    let dataGood = await client.get('/goods/' + id);
    let dataStore = await client.get('/stores/' + storeId);
    let haveGood = _.filter(dataStore.goods, function (e) {
        return e.name == dataGood.name;
    });
    if (haveGood.length == 0) {
        let obj = {
            _id:dataGood._id,
            name: dataGood.name,
            type: dataGood.type,
            weight: dataGood.weight,
            productDate: dataGood.productDate,
            longLife: dataGood.longLife,
            price: dataGood.price,
            amount: dataGood.amount
        }
        dataStore.goods.push(obj);
        await client.put('/stores/' + storeId, {goods:dataStore.goods});
    }
    res.send('suc');
});

// 下架门店商品
router.put('/delGoods/:id', async function (req, res) {
    let storeId = req.params.id;
    let { id } = req.body;
    let obj = await client.get('/stores/' + storeId);
    let ary=_.filter(obj.goods,function(e){
        return e._id!=id
    });
    await client.put('/stores/' + storeId, {goods:ary});
    res.send('suc');
});

// 添加门店服务
router.put('/addServices/:id', async function (req, res) {
    let storeId = req.params.id;
    let { id } = req.body;
    let dataService = await client.get('/services/' + id);
    let dataStore = await client.get('/stores/' + storeId);
    let haveService = _.filter(dataStore.services, function (e) {
        return e.name == dataService.name;
    });
    if (haveService.length == 0) {
        let obj = {
            _id:dataService._id,
            name: dataService.name,
            workTime: dataService.workTime,
            timeLong: dataService.timeLong,
            staffLevel: dataService.staffLevel,
            basePrice: dataService.basePrice,
            weight: dataService.weight
        }
        dataStore.services.push(obj);
        await client.put('/stores/' + storeId, {services:dataStore.services});
    }
    res.send('suc');
});

// 下线门店服务
router.put('/delServices/:id', async function (req, res) {
    let storeId = req.params.id;
    let { id } = req.body;
    let obj = await client.get('/stores/' + storeId);
    let ary=_.filter(obj.services,function(e){
        return e._id!=id
    });
    await client.put('/stores/' + storeId, {services:ary});
    res.send('suc');
});

// 获取修改店铺商品
router.post('/updateGoods',async function(req,res){
    let {storeId,goodId}=req.body
    let ary = await client.get('/stores');
    let tStore=_.filter(ary,function(e){
        return e._id==storeId
    });
    let tGood=_.filter(tStore[0].goods,function(e){
        return e._id=goodId
    })
    res.send(tGood[0]);
});

// 确认修改店铺商品
router.put('/updateGoods/:id',async function(req,res){
    let body=req.body;
    let id=req.params.id;
    let obj = await client.get('/stores/'+id);
    obj.goods.forEach(element => {
        if(element._id==body.goodId){
            element.price=body.price;
            element.amount=body.amount;
        }
    });
    await client.put('/stores/'+id,{goods:obj.goods})
    res.send('suc')
});
module.exports = router;