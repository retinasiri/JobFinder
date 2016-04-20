var expect = require("chai").expect;
var mongoose = require("mongoose");
var jobModel = require('../models/Job');
var Promise = require("bluebird");
var jobsData = require("../jobs-data.js");

function resetJobs() {
    return new Promise(function (resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe("get jobs", function () {

    var jobs;

    before(function (done) {
        jobsData.connectDB('mongodb://dev:devops123@93.188.161.44:27017/test')
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(jobsData.findJobs)
            .then(function setJobs(collection) {
                jobs = collection;
                done();
            });
    });

    it("should never be empty since jobs are seeded", function () {
        expect(jobs.length).to.be.at.least(1);
    });

    it("shoul have a job with a title", function () {
        expect(jobs[0].title).to.not.be.empty;
    });

    it("shoul have a job with a description", function () {
        expect(jobs[0].description).to.not.be.empty;
    });

});
