const systemConfig = {
    // 微信小程序
    appid: 'wxf51b2622ba4bcdca',
    appSecret: '3fce7e515125907770b3dbd06a65a983',
    jsCode2SessionUrl: 'https://api.weixin.qq.com/sns/jscode2session',

    maxClients: 2,     // 房间最大人数
    seatReservationTime: 30,     // 座位预约时间(秒)

    msgType: {
        JOIN: 'join', // 加入房间消息
        LEAVE: 'leave', // 离开房间消息
        UP: 'up', // 更新房间消息
        DOWN: 'down', // 离开房间消息
        UPDATE: 'update', // 更新房间消息
        WIN: 'win', // 胜利消息 一方获得胜利
    }
}
module.exports = systemConfig;
