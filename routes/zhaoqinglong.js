var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");
const path = require('path');
const multiparty = require('multiparty');

//表格渲染
router.get('/all', async function (req, res) {
    // console.log(req.query.name,req.query.value,"=======================")
    let { name, value, page, rows } = req.query;
    let searchObj = {};
    if (name) {
        searchObj[name] = value;
    }
    let data = await client.get('/stores', {page,rows,submitType:'findJoin',ref:'classes',...searchObj});
    let dataAry = [];
    for(let item of data){
        if(item.passed=="1"){
            dataAry.push(item);
        }
    }
    res.send(dataAry);
});

//增加
router.post('/addStore', async function (req, res) {
    let body = req.body;
    let data=  await client.post('/stores', body);
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
    console.log(id,12345);
    await client.delete('/stores/'+id);
    res.send('suc');
});


//获取单个id
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data=await client.get('/stores/'+id);
    res.send(data);
});

//修改
router.put('/:id', async function (req, res) {
    let body = req.body;
    body.classes={
        $ref:'classes',
        $id:body.classes
    };
    let id=req.params.id;
    if(body.passed=="1"){
        await client.put('/stores/'+id,{name:body.name,licenseCode:body.licenseCode,address:body.address,
            location:body.location,legalPerson:body.legalPerson,phone:body.phone,special:body.special,
            vip:body.vip,licenseImg:body.licenseImg,shopImg:body.shopImg,rate:body.rate});
    };
    res.send('suc')
});

//上传图片
router.post('/upload',function(req,res){
    // console.log(123456);
    let form = new multiparty.Form({uploadDir:"./public/upload"});
    form.parse(req,function(err,fields,files){
      if(err){
        res.send(err);
      }else{
        res.send(path.basename(files.uploadHeader[0].path));
      }
    })
  })


//商店关联添加到owners集合
router.put('/owner/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/owners/"+id);
    data.stores.push(req.body.newStore);
    await client.put("/owners/"+id,{stores:data.stores}) 
    res.send('suc')
});

module.exports = router;