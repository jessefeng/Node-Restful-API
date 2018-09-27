const mongoose = require('mongoose');

const workExpSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    companyName: String,
    period: String,
});

module.exports = mongoose.model("workExp", workExpSchema);