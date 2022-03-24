var expect  = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


it('Home', function() {  
  chai.request('http://localhost:8089')
  .get('/')
  .end(function(err, res) {
    expect(res).to.have.status(200);
  });
});