const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
        brand: {
          type: String,
          required: true
        },
        img_url: {
          type : String,
          required : true,
        },
        model: {
          type: String,
          required: true
        },
        year: {
          type: Number,
          required: true
        },
        color: {
          type: String,
          required: true
        },
        mileage: {
          type: Number,
          required: true
        },
        fuel : {
          type : String,
          required : true
        },
        status: {
          type: String,
          required: true
        },
        price_per_day: {
          type: Number,
          required: true
        },
        owner_id: {
          type: String,
          required: true
        },
        // Additional car details
    
});

module.exports = mongoose.model("Car", carSchema);
