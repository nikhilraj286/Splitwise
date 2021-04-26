var assert = require('chai').assert;
var app = require('../index.js');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


// ROOT_URL="http://34.209.25.230:3001"
ROOT_URL="http://localhost:3001"


describe("POST-- Get user details by userId", () => {
  it("/getUser", (done) => {
    chai.request.agent(app)
      .post("/getUser")
      .send({user_id:'1'})
      .then(function (res) {
        console.log(res);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});



describe("POST-- Get Group data by groupId", () => {
    it("/getGroupData", (done) => {
      chai.request.agent(app)
        .post("/getGroupData")
        .send({group_id:'1'})
        .then(function (res) {
          console.log(res);
          expect(res).to.have.status(200);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });

 

  describe("POST-- get all groups of user(userId)", () => {
    it("/getGroups", (done) => {
      chai.request.agent(app)
        .post("/getGroups")
        .send({user_id:'1'})
        .then(function (res) {
          console.log(res);
          expect(res).to.have.status(200);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });


describe("GET-- Get All transactions", () => {
    it("/getTransactions", (done) => {
      chai.request.agent(app)
        .get("/getTransactions")
        .then(function (res) {
          console.log(res);
          expect(res).to.have.status(200);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });



  describe("GET-- Get All Users", () => {
    it("/getUsers", (done) => {
      chai.request.agent(app)
        .get("/getUsers")
        .then(function (res) {
          console.log(res);
          expect(res).to.have.status(200);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });
