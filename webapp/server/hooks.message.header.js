



MessageHeaders.after.insert(function (userId, doc) {
  process.env.TRACE && console.log("Received a FHIR MessageHeader", doc);

  doc.data.forEach(function(resource){
    if (resource.resourceType === "Patient") {
      Patients.insert(resource);
    }

  });
});
