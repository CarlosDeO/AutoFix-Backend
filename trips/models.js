'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CarSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true,'No user id found']},
    
});


CarSchema.virtual("addressString").get(function() {
    return `${this.address.building} ${this.address.street}`.trim();
  });

  const Trip = mongoose.model('Car', CarSchema);
  module.exports = {Trip};