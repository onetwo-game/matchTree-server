const colyseus = require('colyseus');
const { MyRoomState } = require('./schema/MyRoomState');

exports.MyRoom = class extends colyseus.Room {
  maxClients = 4;
  state = new MyRoomState();

  onCreate (options) {
    this.onMessage("type", (client, message) => {
      console.log("收到消息");
      console.log(client.sessionId, "发送了消息", message);
      this.broadcast("type", {
        message: '1233'
      });
    });

    this.onMessage("up", (client, message) => {
      console.log("收到消息");
      console.log(client.sessionId, "发送了消息", message);
      this.broadcast("up", JSON.stringify({
        Data: "Your message content here"
      }));
    });
  }

  onJoin (client, options) {
    console.log(client.sessionId, "已加入");
  }

  onLeave (client, consented) {
    console.log(client.sessionId, "已离开");
  }

  onDispose() {
    console.log("room", this.roomId, "已销毁");
  }

}
