import { HTTP } from 'meteor/http';
import { MessagingResponse } from 'twilio';


var fhirVersion = 'fhir-3.0.0';

// if(typeof oAuth2Server === 'object'){
//   // TODO:  double check that this is needed; and that the /api/ route is correct
//   JsonRoutes.Middleware.use(
//     // '/api/*',
//     '/fhir-3.0.0/*',
//     oAuth2Server.oauthserver.authorise()   // OAUTH FLOW - A7.1
//   );
// }

JsonRoutes.add("get", "/ping" , function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Device/' + req.params.id);

  res.setHeader("Access-Control-Allow-Origin", "*");

  JsonRoutes.sendResult(res, {
    code: 200,
    data: 'pong'
  });
});




// JsonRoutes.add("get", "/" + fhirVersion + "/Device", function (req, res, next) {
//   process.env.DEBUG && console.log('GET /fhir/Device', req.query);

//   res.setHeader("Access-Control-Allow-Origin", "*");

//   var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
//   var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

//   if (accessToken || process.env.NOAUTH) {
//     process.env.TRACE && console.log('accessToken', accessToken);
//     process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

//     if (typeof SiteStatistics === "object") {
//       SiteStatistics.update({_id: "configuration"}, {$inc:{
//         "Devices.count.search-type": 1
//       }});
//     }

//     var databaseQuery = {};

//     process.env.DEBUG && console.log('databaseQuery', databaseQuery);
//     process.env.DEBUG && console.log('Devices.find(id)', Devices.find(databaseQuery).fetch());

//     // because we're using BaseModel and a _transform() function
//     // Devices returns an object instead of a pure JSON document
//     // it stores a shadow reference of the original doc, which we're removing here
//     var deviceData = Devices.find(databaseQuery).fetch();

//     deviceData.forEach(function(patient){
//       delete patient._document;
//     });

//     JsonRoutes.sendResult(res, {
//       code: 200,
//       data: deviceData
//     });
//   } else {
//     JsonRoutes.sendResult(res, {
//       code: 401
//     });
//   }
// });
