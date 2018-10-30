var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

router.get('/users', async function (req, res) { //获取管理员账户
    let params = req.query;
    let privilege = params.privilege;
    let page = params.page || 1;
    let rows = params.rows || 10;
    let user = params.user;
    let data = await client.get("/users", {
        page,
        rows,
        privilege,
        user
    });
    res.send(data);
});
router.post('/addAdminUser', async function (req, res) { //增加
    let params = req.body;
    console.log(params);
    await client.post("/users/", params);
    res.send("suc");

});
router.delete('/delAdminUser', async function (req, res, next) { //删除数据
    let id = req.query.id;
    await client.delete("/users/" + id);
    res.send("suc")
});

router.put('/updateAdminUser/:id', async function (req, res) { //修改数据
    let id = req.params.id;
    await client.put("/users/" + id, {
        "phone": req.body.phone,
        "user": req.body.user,
        "pwd": req.body.pwd,
        "passed": req.body.passed,
        "privilege": req.body.privilege
    });
    res.send("suc");
});


// ========用户账户======

router.get('/usersAccount', async function (req, res) {
    let params = req.query;
    let privilege = params.privilege;
    let page = params.page || 1;
    let rows = params.rows || 10;
    let user = params.user;
    let passed=params.passed;    
    let data = await client.get("/users", {
        page,
        rows,
        privilege,
        user,
        passed
    });   
    res.send(data);


});

router.put('/updateUser/:id', async function (req, res) { //修改数据
    let id = req.params.id;
    console.log('====================================');
    console.log(req.body.privilege);
    console.log('====================================');
    await client.put("/users/" + id, {
        "phone": req.body.phone,
        "user": req.body.user,
        "pwd": req.body.pwd,
        "passed": req.body.passed,
        "privilege": req.body.privilege
    });
    res.send("suc");
});



// =============用户账户审核==============
router.get('/getApplications', async function (req, res) { //获取管理员账户
    let params = req.query;
    let source=params.source;
    let page = params.page || 1;
    let rows = params.rows || 10;
    let data = await client.get("/applications", {
        page,
        rows,
        source
    });
    res.send(data);
});

module.exports = router;