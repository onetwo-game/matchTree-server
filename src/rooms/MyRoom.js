const colyseus = require('colyseus');
const { MyRoomState } = require('./schema/MyRoomState');
const systemConfig = require("../config");

exports.MyRoom = class extends colyseus.Room {
  maxClients = systemConfig.maxClients; // 房间最大人数
  state = new MyRoomState();
  roomInfo = {  // 定义 roomInfo ，记录双方的信息
    owner: null,
    opponent: null,
  }

   // 发送 "fire" 事件到所有客户端, 除了发送者自己.
  // this.broadcast("fire", message, { except: client });
  onCreate (client, options) {
    // 更新房间信息
    this.onMessage("update", (client, message) => {
      console.log("收到消息");
      console.log(client.sessionId, "发送了消息", message);
      if(this.roomInfo.owner.sessionId === client.sessionId) {
        this.roomInfo.owner.score = message.score;
      } else {
        this.roomInfo.opponent.score = message.score;
      }
      console.log(systemConfig.msgType.UPDATE, "更新房间信息");
      this.broadcast(systemConfig.msgType.UPDATE, JSON.stringify({
        roomInfo: this.roomInfo,
        message: "房间信息更新"
      }), { except: client });
    });

    this.onMessage("win", (client, message) => {
      console.log("收到消息");
      this.broadcast(systemConfig.msgType.WIN, JSON.stringify({
        roomInfo: this.roomInfo,
        message: "胜利消息"
      }), { except: client });
    });
  }

  onJoin (client, options) {
    console.log(client.sessionId, "已加入");
    console.log("options", options);
    const info = {
      sessionId: client.sessionId,
      ...options,
    }
    if(this.roomInfo.owner === null) {
      this.roomInfo.owner = info;
    } else {
      this.roomInfo.opponent = info;
    }
    // 加入房间消息
    console.log('111', systemConfig);
    this.broadcast(systemConfig.msgType.JOIN, JSON.stringify({
      roomInfo: this.roomInfo,
      message: "加入房间成功"
    }),  { except: client });
  }

  onLeave (client, consented) {
    console.log("❌ 客户端离开:", client.sessionId, "自愿离开:", consented);
  }

  onDispose() {
    console.log("room", this.roomId, "已销毁");
  }

}
