var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.connect("mongodb://************************@ds013162.mlab.com:13162/luwenchaobh");
autoIncrement.initialize(connection);

//longToShortURLSchema 用于存放一组长短地址

var longToShortURLSchema = new Schema({

    longURL:String,
    shortURL:String

});

longToShortURLSchema.plugin(autoIncrement.plugin, 'LongToShort');
var LongToShort = connection.model("LongToShort", longToShortURLSchema);
module.exports = LongToShort;
