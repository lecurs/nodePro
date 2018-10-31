var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

//修改
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data=await client.get('/owners/'+id, {submitType:'findJoin',ref:'users'});
    res.send(data);
});

//确认修改
router.put('/:id', async function (req, res) {
    let body = req.body;
    // body.users={
    //     $ref:'users',
    //     $id:body.users
    // };
    let id=req.params.id;
    if(body.passed=="1"){
        await client.put('/users/'+id,{user:body.user,phone:body.phone,pwd:body.pwd,role:body.role,privilege:body.privilege});
    };
    // let data = await client.get('/students/'+id);
    res.send('suc')
});

//渲染
router.get('/', async function (req, res) {
    
    let data = await client.get('/owners', {submitType:'findJoin',ref:'users'});
    // console.log(data);
    res.send(data);
});

// 新增
router.post('/', async function (req, res) {
    let body = req.body;
    // body.classes={
    //     $id:body.classes,
    //     $ref:'classes'
    // };
    await client.post('/applications', body);
    res.send('suc');
});
module.exports = router;