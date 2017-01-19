describe('clinical:hl7-resources-test-scripts', function () {
  var server = meteor();
  var client = browser(server);

  it('TestScripts should exist on the client', function () {
    return client.execute(function () {
      expect(TestScripts).to.exist;
    });
  });

  it('TestScripts should exist on the server', function () {
    return server.execute(function () {
      expect(TestScripts).to.exist;
    });
  });

});
