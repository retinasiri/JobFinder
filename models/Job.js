var mongoose = require("mongoose");

var jobSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function () {
    Job.find({}).exec(function (error, collection) {
        if (collection.length === 0) {
            Job.create({title: 'Cook', description: 'You will be making bagels'});
            Job.create({title: 'Waiter', description: 'You will be making bagels'});
            Job.create({title: 'Programmer', description: 'You will be making bagels'});
            Job.create({title: 'Axe Marker', description: 'You will be making bagels'});
        }
    })
};