const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User'); // 确保路径正确
const Point = require('../models/Point');

// 连接数据库
const connectDB = async () => {
    
    const dbUrl = process.env.DB_URL
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 增加超时时间
    }).then(() => {
      console.log('MongoDB Connected');
    }).catch((error) => {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    });
};

// 添加用户数据
const addUser = async (req, res) => {
  try {
    const addTime = Date.now();
    const { openId, scene, shareId, from } = req.body;

    const existingUser = await User.findOne({ openId });
    if (existingUser) {
        return res.json({
            code: 200,
            data: existingUser,
            message: "用户已存在"
        });
    }
    const newUser = await User.create({ openId, scene, shareId, from, addTime });
    res.json({
        code: 200,
        data: newUser,
        message: "添加成功"
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
};

const addPoint = async (req, res) => {
  try {
    const { openId, code, chapter = 1, level = 1, data = {} } = req.body;
    const addTime = Date.now();
    const point = await Point.create({ openId, code, chapter, level, data, addTime });
    res.json({
        code: 200,
        data: point,
        message: "添加成功"
    });
  } 
  catch (error) {
    res.status(500).json({ message: "点位错误", error: error.message });
  }
}

const getUserInfo = async (req, res) => {
  try {
    const { openId } = req.body;
    const user = await User.findOne({ openId });
    if(!user) {
      return res.json({
        code: 200,
        data: null,
        message: "用户不存在"
      });
    }
    res.json({
        code: 200,
        data: user,
        message: "获取成功"
    });
  } catch (error) {
    res.status(500).json({ message: "获取失败", error: error.message });
  }
}

const updateUser = async (req, res) => {
  try {
    const { openId, coins, chapter, level } = req.body;
    const user = await User.findOneAndUpdate({ openId }, { coins, chapter, level }, { new: true });
    res.json({
        code: 200,
        data: user,
        message: "修改成功"
    });
  } catch (error) {
    res.status(500).json({ message: "修改失败", error: error.message });
  }
}

// 先连接数据库，然后再执行其他操作
connectDB().then(() => {
  // 这里可以放置其他需要在连接后执行的代码
  // 例如，启动服务器，设置路由等
});

module.exports = { addUser, addPoint, getUserInfo, updateUser };


