const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    title: {type: String},
    description: {type: String},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Task', schema);
