const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    country: {type: String, required: true},
    city: {type: String, required: true},
    department: {type: String, required: true},
    positionName: {type: String, required: true},
    hit: {type: String, required: true}
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;