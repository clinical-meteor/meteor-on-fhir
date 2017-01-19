describe('clinical:hl7-resources-subscriptions', function () {
  var server = meteor();
  var client = browser(server);

  it('Subscriptions should exist on the client', function () {
    return client.execute(function () {
      expect(Subscriptions).to.exist;
    });
  });

  it('Subscriptions should exist on the server', function () {
    return server.execute(function () {
      expect(Subscriptions).to.exist;
    });
  });

});
