var assert = require('chai').assert;
var app = require('../index.js');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
var JWTtoken = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjA4NDliMWZmN2MwYzczOTliNDdiNDk5IiwiZnVsbF9uYW1lIjoiT2xpdmVyIFdpbHNvbiIsImVtYWlsIjoib2xpdmVyQGdtYWlsLmNvbSIsImN1cnJlbmN5IjoiVVNEIiwiaWF0IjoxNjE5NDA3NTg5fQ.Nze57J8w6yjDVgDUCLeqzFgS7EZsowwdHdXisKfXS9s'


// ROOT_URL="http://34.209.25.230:3001"
ROOT_URL = "http://localhost:3001"


describe("POST-- Get user details by userId", () => {
  it("/getUser", (done) => {
    chai.request.agent(app)
      .post("/getUser")
      .set('authorization', JWTtoken)
      .send({ user_id: '60848d89a680563492900485' })
      .then(function (res) {
        console.log(res.status);
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
      .set('authorization', JWTtoken)
      .send({ group_id: '6084976cf7c0c7399b47b444' })
      .then(function (res) {
        console.log(res.status);
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
      .set('authorization', JWTtoken)
      .send({ user_id: '6084976cf7c0c7399b47b444' })
      .then(function (res) {
        console.log(res.status);
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
      .set('authorization', JWTtoken)
      .then(function (res) {
        console.log(res.status);
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
      .set('authorization', JWTtoken)
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
