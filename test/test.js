var expect  = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Unit test
it('Home Page', function() { 
    chai.request('http://localhost:8090')
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
    });
  });