var mongoose = require('mongoose');

var classanduser = {
    classId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId
};

module.exports = classanduser;
