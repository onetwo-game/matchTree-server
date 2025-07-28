const { v4: uuidv4 } = require('uuid');
const db = require("../lib/db");

exports.addUser = async (req, res) => {
    const id = uuidv4();
    const addTime = Date.now();
    const { openId, scene, shareId, from } = req.body;
    console.log(req.body);
    const user = await db.addUser({ id, openId, scene, shareId, from, addTime });
    return user;
};


