// Original conversation:
// https://forums.meteor.com/t/meteor-change-og-meta-tags-dynamically/41822/19  

// // server.js
// import { WebApp } from 'meteor/webapp';

// const serverRendering = (req, res, next) => {
//   try {
//     const ua = req.headers['user-agent'];

//     if (/bot|facebook|twitter|pinterest|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex/i.test(ua)) {

//       // Send any non matches forward
//       if (!pathName.includes('/target-url')) {
//         next();
//       }

//       // Fetch the data you need to build your tags (and htmlContent)
//       // then construct your response:
//       const html = `
//         <!html>
//         <head>
//           <title>${title}</title>
//           <meta name="description" content="${description}" />
//           <meta property="og:type" content="website"/>
//           <meta property="og:title" content="${title}"/>
//           <meta property="og:description" content="${description}"/>
//           <meta property="og:site_name" content="Your Site"/>
//           <meta property="og:url" content="${rootUrl}"/>
//           <meta property="og:image" content="${image}"/>
//         </head>
//         <body>
//           ${htmlContent}
//         </body>
//       `;
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/html');
//       res.end(html);
//       }

//     } else {
//       next();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// // attach the handler to webapp
// WebApp.connectHandlers.use(serverRendering);