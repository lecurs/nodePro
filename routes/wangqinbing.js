var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

router.get('/', async function (req, res) {
    let { page, rows,type,value } = req.query;
    let searchObj = {};
    if (type) {
        searchObj[type] = value;

    }
    let data = await client.get('/orders', {page,rows, ...searchObj,submitType: 'findJoin', ref: ['stores', 'goods','services'] })
    console.log(data)
    
    for (let item of data.rows) {
        if (item.state == 0) {
            item.state = "未完成"
        } else if (item.state == 1) {
            item.state = "已完成"
        }
    }
    res.send(data)
})
router.get('/:id', async function (req, res) {
    let id = req.params.id
    let data = await client.get('/orders/' + id, { submitType: 'findJoin', ref: ['stores', 'goods','services'] })
    console.log(data);

    let datas = {};
    if(data.state==0){
        data.state="未完成"
    }else if(data.state==1){
        data.state="已完成"
    }
    datas.id = data._id
    datas.consignee = data.consignee;
    datas.consignphone = data.consignphone;
    datas.consignadr = data.consignadr
    datas.state = data.state;
    if(data.type =="商品"){
        datas.price=data.goods.price
    }else if(data.type =="服务"){
        datas.price=data.services.basePrice;
    }
    
    console.log(datas)
    res.send(datas)
})
router.delete('/:id', async function (req, res) {
    let id = req.params.id;
    console.log(id)
    await client.delete("/orders/" + id);
    res.send("suc");

});
router.put('/:id', async function (req, res) {
    let id = req.params.id;
    // console.log(id)
    let body = req.body;
    console.log(body)
    if(body.state=="未完成"){
        body.state=0
    }else if(body.state=="已完成"){
        body.state=1
    }
    console.log(body)
    await client.put('/orders/' + id, { state: body.state, consignee: body.consignee, consignphone: body.consignphone, consignadr: body.consignadr });
    res.send("suc")
})

module.exports = router;