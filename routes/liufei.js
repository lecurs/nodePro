var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

//修改
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data=await client.get('/students/'+id);
    res.send(data);
});

//确认修改
router.put('/:id', async function (req, res) {
    let body = req.body;
    body.classes={
        $ref:'classes',
        $id:body.classes
    };
    let id=req.params.id;
    await client.put('/owners/'+id,{name:body.name,age:body.age,gender:body.gender,imgPath:body.imgPath});
    // let data = await client.get('/students/'+id);
    // console.log(121212,data)
    res.send('suc')
});

//渲染
router.get('/', async function (req, res) {
    let { name, value, page, rows } = req.query;
    let searchObj = {};
    if (name) {
        searchObj[name] = value;
    }
    let data = await client.get('/owners', {page,rows,submitType:'findJoin',ref:'classes',...searchObj});
    res.send(data);
});
module.exports = router;