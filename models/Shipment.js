const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },

      phone: {
         type: Number,
         required: true,
      },

     email:{
        type: String,
        required: true,
     },

     destination:{
        type: String,
        required: true,
     }
,
     product:{
        type: String,
        required: true,
     }
,
     quantity:{
        type: String,
        required: true,
     }
,
     images:{
        type: String,
        required: true,
     }
,
     notes:{
        type: String,
        required: true,
     }
,


      marketing: [String],
   },
   
);

const Shipment = mongoose.model("Shipment", ShipmentSchema);
module.exports = Shipment;
