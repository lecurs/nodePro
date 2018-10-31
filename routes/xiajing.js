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
    let rows = params.rows || 5;
    let user = params.user;
    let passed = params.passed;
    if (passed) {
        let data = await client.get("/users", {
            page,
            rows,
            privilege,
            user,
            passed,
        });
        res.send(data);
    } else {
        let data = await client.get("/users", {
            page,
            rows,
            privilege,
            user,
        });
        res.send(data);
    }

});

router.get('/usersAccountByType', async function (req, res) {
    let params = req.query;
    let privilege = params.privilege;
    let page = params.page || 1;
    let rows = params.rows || 5;
    let passed = params.passed;
    if (passed) {
        let data = await client.get("/users", {
            page,
            rows,
            privilege,
            passed,
            findType: "exact"
        });
        res.send(data);
    } else {
        let data = await client.get("/users", {
            page,
            rows,
            privilege,
        });
        res.send(data);
    }

});
router.put('/updateUser/:id', async function (req, res) { //修改用户数据
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



// =============用户账户审核==============
router.get('/getApplications', async function (req, res) { //获取审核
    let params = req.query;
    let source = params.source;
    let handle = params.handle;
    let page = params.page || 1;
    let rows = params.rows || 10;
    let data = await client.get("/applications", {
        page,
        rows,
        source,
        handle
    });
    res.send(data);
});
router.put('/updateApplications/:id', async function (req, res) { //更改审批数据状态
    let id = req.params.id;
    let passed = req.body.passed;
    let handle = req.body.handle;
    let data = await client.get("/applications/" + id);
    data.passed = passed;
    data.handle = handle;
    await client.put("/applications/" + id, {
        "source": data.source,
        "tiem": data.tiem,
        "content": data.content,
        "passed": data.passed,
        "handle": data.handle
    });
    res.send("suc");
});

router.put('/updateUserPassed/:id', async function (req, res) { //更改用户账户状态
    let id = req.params.id;
    let passed = req.body.passed;
    let ownnerid = req.body.ownnerid;
    let newMsg = req.body.newMsg;
    let data = await client.get("/users/" + id);
    if (newMsg) {
        data.phone = newMsg.phone;
        data.pwd = newMsg.pwd;
    }
    if (ownnerid) {
        data.ownnerid = ownnerid;
    }
    data.passed = passed;
    await client.put("/users/" + id, {
        "user": data.user,
        "phone": data.phone,
        "pwd": data.pwd,
        "passed": data.passed,
        "privilege": data.privilege,
        "ownerId": data.ownnerid
    });
    res.send(data);
});

//修改已通过用户状态

router.post('/addOwners', async function (req, res) { //给已通过的用户创建owner
    let params = req.body;
    let data = await client.post("/owners/", params);
    res.send(data);

});


// ========修改已审核店铺的状态=======
router.put('/updateStorePassed/:id', async function (req, res) { //更改店铺状态
    let id = req.params.id;
    let passed = req.body.passed;
    let newMsg = req.body.newMsg;
    let data = await client.get("/stores/" + id);
    if (newMsg) {
        data.name = newMsg.name
        data.licenseCode = newMsg.licenseCode
        data.licenseImg = newMsg.licenseImg
        data.adress = newMsg.adress
        data.location = newMsg.location
        data.legalPerson = newMsg.legalPerson
        data.phone = newMsg.phone
        data.shopImg = newMsg.shopImg
        data.special = newMsg.special
        data.vip = newMsg.vip
        data.rate = newMsg.rate
    }

    let result = await client.put("/stores/" + id, {
        "name": data.name,
        "licenseCod": data.licenseCod,
        "licenseImg": data.licenseImg,
        "adress": data.adress,
        "location": data.location,
        "legalPerson": data.legalPerson,
        "phone": data.phone,
        "shopImg": data.shopImg,
        "special": data.special,
        "vip": data.vip,
        "rate": data.rate
    });

    res.send(result);
});
//获取宠主数据
router.get('/getPetMaster', async function (req, res) {
    let params = req.query;
    let page = params.page || 1;
    let rows = params.rows || 5;
    let data = await client.get("/petmasters", {
        page,
        rows,
    });
    res.send(data);
});

//获取所有供应商

router.get('/getAllSupplier', async function (req, res) {
    let params = req.query;
    let page = params.page || 1;
    let rows = params.rows || 5;
    let data = await client.get("/suppliers", {
        page,
        rows,
    });
    res.send(data);
});

//获取所有店铺

router.get('/getAllStores', async function (req, res) {
    let params = req.query;
    let page = params.page || 1;
    let rows = params.rows || 5;
    let name =params.name
    let data = await client.get("/stores", {
        page,
        rows,
        name
    });
    res.send(data);
});

//更改店铺状态


router.put('/updateStore/:id', async function (req, res) { //更改用户账户状态

    let id = req.params.id;
    let passed = req.body.passed;
    console.log('====================================');
    console.log(id, passed);
    console.log('====================================');
    await client.put("/stores/" + id, {
        "passed": passed,
    });
    res.send("suc");
});
router.get('/getAllStoresByType', async function (req, res) {
    let params = req.query;
    let page = params.page || 1;
    let rows = params.rows || 5;
    let passed = params.passed;
    if (passed) {
        let data = await client.get("/stores", {
            page,
            rows,
            passed,
            findType: "exact"
        });
        res.send(data);
    } else {
        let data = await client.get("/stores", {
            page,
            rows,
        });
        res.send(data);
    }

});

module.exports = router;