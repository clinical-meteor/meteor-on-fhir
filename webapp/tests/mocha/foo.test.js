describe('mocha tests', function () {
  var server = meteor();
  var client = browser(server);

  it('should exist on the client', function () {
    return client.execute(function () {
      expect(true).to.be.true;
    });
  });

  it('should exist on the server', function () {
    return server.execute(function () {
      expect(true).to.be.true;
    });
  });



});
