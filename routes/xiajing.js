var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("localhost:8080");

router.get('/users', async function (req, res) {
    let params = req.query;
    let privilege = params.privilege;   
    let page = params.page || 1;
    let rows = params.rows || 10;
    let data = await client.get("/users", {
        page,
        rows,
        privilege
    });
    res.send(data);

});
router.delete('/delAdminUser', async function (req, res, next) {//删除数据
    let id = req.query.id; 
    await client.delete("/users/" + id);
    res.send("suc")
});
module.exports = router;