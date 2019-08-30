'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CarSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true,'No user id found']},
    vehicle: {
            year: {type: Number},
            make: {type: String},
            model: {type: String}
    }
});


// CarSchema.virtual("vehicleString").get(function() {
//     return `${this.vehicle.year} ${this.vehicle.make} ${this.vehicle.model}` .trim();
//   });

  const Car  = mongoose.model('car', CarSchema);
  module.exports = {Car};