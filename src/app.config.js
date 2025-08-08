const config = require("@colyseus/tools").default;
const { monitor } = require("@colyseus/monitor");
const { playground } = require("@colyseus/playground");
const config = require("./config");

const express = require('express');
const { addUser, addPoint, getUserInfo, updateUser } = require('./lib/db');

const app = express();
// 确保使用中间件解析 JSON 请求体
app.use(express.json());
/**
 * Import your Room files
 */
const { MyRoom } = require("./rooms/MyRoom");

module.exports = config({
    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom);
    },

    initializeExpress: (app) => {
        /**
         * Use @colyseus/playground
         * (It is not recommended to expose this route in a production environment)
         */
        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground());
        }

        app.use('/playground', playground());

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/colyseus/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/monitor", monitor());

        app.use('/aaa/3sFDXumnyH.txt', (req, res) => {
            res.send('62b8360322bfc43445f76c193a8baeaa');
        }); 


        app.get("/hello_world", (req, res) => {
            res.json({
                message: "It's time to kick ass and chew bubblegum!"
            });
        });

        // 定义路由
        app.post('/api/users/add', addUser);
        // 添加埋点
        app.post('/api/point/add', addPoint);
        // 获取用户信息
        app.post('/api/users/getInfo', getUserInfo);

        // 改用户信息
        app.post('/api/users/update', updateUser);

        app.post('/api/users/login', async (req, res) => {
            const { appid, appSecret, jsCode2SessionUrl } = config;
            const { code } = req.body;
            const url = `${jsCode2SessionUrl}?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
            const response = await fetch(url);
            const data = await response.json();
            res.json({
                code: 200,
                message: 'success',
                data: data
            });
        });
    },

    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }

});
