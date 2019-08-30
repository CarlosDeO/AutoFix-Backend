'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const FixSchema = mongoose.Schema({
    title: {type: String},
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: [true,'No car id found']},
    date: {type: Date},
    description: {type: String},
    cost: {type: String},
})

const Fix = mongoose.model('fix', FixSchema);

module.exports = {Fix}