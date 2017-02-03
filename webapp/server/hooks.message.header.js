



MessageHeaders.after.insert(function (userId, doc) {
  process.env.TRACE && console.log("Received a FHIR MessageHeader", doc);

  doc.data.forEach(function(resource){
    if (resource.resourceType === "Patient") {
      if (resource.birthDate) {
        var date = resource.birthDate.split('-');
        resource.birthDate = new Date(date[0], date[1] - 1, date[2]);
      }

      process.env.DEBUG && console.log("Patient", resource);

      Patients.insert(resource);
    }

  });
});
