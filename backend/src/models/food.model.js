const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true     
    },
    description: {
        type: String,
        required: true
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodPartner',
        required: true
    }
}); 

module.exports = mongoose.model('Food', foodPartnerSchema);
