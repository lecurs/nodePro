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

module.exports = router;