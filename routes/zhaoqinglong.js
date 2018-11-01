var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");
const path = require('path');
const multiparty = require('multiparty');

//查询
router.get('/all/:id', async function (req, res) {
    console.log(1213131)
    let id = req.params.id;
    let data = await client.get('/stores');
    data = data.filter(function (item, index) { return item.owner == id });
    data = data.filter(function (item, index) { return item.passed == "1" });
    let { name, value} = req.query;
    let dataAry = [];
    for (let item of data) {
        if (item.name == value) {
            dataAry.push(item);
        }
    }
    console.log(data,5757565678)
    res.send(dataAry);
});

//表格渲染
router.get('/ownerstore/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/stores');
    data = data.filter(function (item, index) { return item.owner == id });
    data = data.filter(function (item, index) { return item.passed == "1" });
    res.send(data)
})

//增加
router.post('/addStore', async function (req, res) {
    let body = req.body;
    let data = await client.post('/stores', body);
    res.send(data);
});
//增加application
router.post('/saveApplication', async function (req, res) {
    let body = req.body;
    await client.post('/applications', body);
    res.send("suc");
});


// 删除商店信息
router.delete('/:id', async function (req, res) {
    let id = req.params.id;
    console.log(id, 12345);
    await client.delete('/stores/' + id);
    res.send('suc');
});


//获取单个id
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get('/stores/' + id);
    res.send(data);
});

//修改
router.put('/:id', async function (req, res) {
    let body = req.body;
    body.classes = {
        $ref: 'classes',
        $id: body.classes
    };
    let id = req.params.id;
    if (body.passed == "1") {
        await client.put('/stores/' + id, {
            name: body.name, licenseCode: body.licenseCode, address: body.address,
            location: body.location, legalPerson: body.legalPerson, phone: body.phone, special: body.special,
            vip: body.vip, licenseImg: body.licenseImg, shopImg: body.shopImg, rate: body.rate
        });
    };
    res.send('suc')
});

//上传图片
router.post('/upload', function (req, res) {
    // console.log(123456);
    let form = new multiparty.Form({ uploadDir: "./public/upload" });
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err);
        } else {
            res.send(path.basename(files.uploadHeader[0].path));
        }
    })
})


//商店关联添加到owners集合
router.put('/owner/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/owners/" + id);
    data.stores.push(req.body.newStore);
    await client.put("/owners/" + id, { stores: data.stores })
    res.send('suc')
});

module.exports = router;