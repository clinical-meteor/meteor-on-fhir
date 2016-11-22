describe('clinical:hl7-resources-appointments', function () {
  var server = meteor();
  var client = browser(server);

  it('Appointments should exist on the client', function () {
    return client.execute(function () {
      expect(Appointments).to.exist;
    });
  });

  it('Appointments should exist on the server', function () {
    return server.execute(function () {
      expect(Appointments).to.exist;
    });
  });

});
