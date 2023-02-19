const mongoose = require('mongoose');


const placeSchema = new mongoose.Schema({
  title: {
    type: 'string'
  }
  ,

  // location: {
  //   type: {
  //     type: String,
  //     default: 'Point',
  //     enum: ['Point']
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true
  //   }
  // },

  loc: {
    type: { type: String }, coordinates: [Number], 
  },

})

placeSchema.index( { loc : "2dsphere" } )// placeSchema.createIndex({"loc.coordinates": "2dsphere"})


mongoose.model("place", placeSchema);