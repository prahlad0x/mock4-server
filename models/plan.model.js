
const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
    name : {type :String, required: true},
    email : {type :String, required: true},
    destination : {type :String, required: true, enum : ["India", "Africa", "Europe", "America"], default : "India"},
    totalTravelers : {type :Number, required: true},
    budget : {type :Number, required: true},
})


const Plan = mongoose.model('plan', planSchema)

module.exports = {Plan}