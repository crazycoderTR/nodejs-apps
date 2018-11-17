"use strict";
/* --------------- Variable Definition --------------- */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nodeMongoTest', {useNewUrlParser: true});
/* --------------- Variable Definition --------------- */

let Schema = mongoose.Schema;
let personnelSchema = new Schema({
    name: String,
    surname: String,
    date_of_birth: String,
    email: String
});

mongoose.model('Personnel', personnelSchema);
module.exports = mongoose;