const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
const baseUrl = "http://localhost:3000";

const fakeEmail = 'notmail.com';
const emailA = 'mymailA@mail.com';
const emailB = 'mymailB@mail.com';
const passA = '12345678';
const passB = '87654321';

chai.use(chaiHttp);
describe("TODO API - Users", function(){

    

    it('Create User', function(done) {
        chai.request(baseUrl)
            .get('/api/users')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
})