const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const MapSchema = mongoose.Schema({
  name: { type: String, 'default': '' },
  category: { type: String, 'default': '' },
  description: { type: String, 'default': '' },
  address: { type: String, 'default': '' },
  city: { type: String, 'default': '' },
  coordinate: {
    lat: { type: Number, 'default': 0 },
    lng: { type: Number, 'default': 0 }
  },
  facilities: [String],
  images : [String]
}, {
  timestamps: true
});

MapSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Map', MapSchema);
