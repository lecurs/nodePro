var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");


//判断用户名是否重复
router.get('/', async function (req, res) {//增加
    let user = req.query.user;//获取页面输入的内容
    // console.log(6,user)
    let data = await client.get("/users", {user});//在users集合里面查询包含user的指，赋值给data。
    // console.log(456,data[0].user,user);
    // console.log(5,data.length)
    if(data.length>0){
      for (let i =0;i<data.length;i++){
    if (data[i].user == user) {
        res.send({status: 0 });
      } else {
        res.send({status: 1 });
      }
      }
    
    }else{
      res.send({status: 1 });
    }
});



//判断手机号是否重复
router.get('/validate', async function (req, res) {//增加
    let phone = req.query.phone;
    let data = await client.get("/users", {phone});
        // console.log(data);
    if (data.length > 0) {
      res.send({status: 0 });
    } else {
      res.send({status: 1 });
    }
});

//注册
router.post('/reg', async function (req, res) {//post提交就在body里面获取
  let body = req.body;//得到的是对象
  // console.log(123,body)
  let data = await client.post('/users', body);//post 添加数据到数据库
  res.send(data);
})


//登录
router.post('/login', async function (req, res) {
  let body = req.body;
  let data = await client.get("/users", body);//get 获取数据库信息匹配

  if(Object.keys(data).length>0) {
    if(data[0].privilege==1){
      req.session.user = data[0];
      res.send({ status: 1 });//平台管理登录
    }else if(data[0].passed==1){
      req.session.user = {phone:'11111111111111',pwd:'66666'};
      res.send({ status: 0 });//店铺管理登录
    }else{
      res.send({ status: 2 });//待审核
    }
  } else{
    res.send({ status: 3 });//登录失败
  }
})


//保存session
router.post('/setSession', function (req, res, next) {
  let body = req.body;
  req.session.user = body;
  res.send("链接成功");
});


//提交审核信息
router.post('/audit',async function (req, res) {
  let body = req.body;
  // console.log("body",body)
  let data = await client.post('/applications', body);//post 添加数据到数据库
  res.send("data");
});


module.exports = router;