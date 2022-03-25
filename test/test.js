var expect  = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
// use the app variable from index.js
var app = require( '../index.js' )

/*
Following tests are based on Chai Http
Reference https://www.chaijs.com/plugins/chai-http/
*/

// We test the base url
// A callback is passed to the end() function so that the 
// assertion will run asynchronously 
it('Home', function(done) {  
  chai.request('http://localhost:8090')
  .get('/')
  .end(function(err, res) {
    expect(res).to.have.status(200);
    done(); // mocha will wait until done is called.
  });
});

// Send form data to the auth route
it('Login', function(done) {  
  chai.request(app)
    .post('/auth')
    .type('form')
    .send({ '_method': 'post', 'username': 'abin', 'password': 'password' })
    .then(function (res) {
      expect(res).to.have.status(200);
      done();
    })
    .catch(function (err) {
      throw err;
    });
});

// check the cookie to access private pages
it('Session', function() {  
    var agent = chai.request.agent(app)
  agent
    .post('/auth')
    .send({ username: 'abin', password: 'password' })
    .then(function (res) {
      expect(res).to.have.cookie('loggedin');
      return agent.get('/dashboard')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
});