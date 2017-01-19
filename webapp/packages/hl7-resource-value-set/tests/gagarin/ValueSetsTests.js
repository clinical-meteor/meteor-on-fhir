describe('clinical:hl7-resources-value-sets', function () {
  var server = meteor();
  var client = browser(server);

  it('ValueSets should exist on the client', function () {
    return client.execute(function () {
      expect(ValueSets).to.exist;
    });
  });

  it('ValueSets should exist on the server', function () {
    return server.execute(function () {
      expect(ValueSets).to.exist;
    });
  });

});
