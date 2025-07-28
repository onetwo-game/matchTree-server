const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    openId: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    chapter: {
        type: Number,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    data: {
        type: Object,
        required: false,
        default: {},
    },
    addTime: {
        type: Number,
        required: true,
    },
});


const Point = mongoose.model('points', pointSchema);

module.exports = Point;
