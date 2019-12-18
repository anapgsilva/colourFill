const fetch = require('node-fetch');
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



exports.dataImage = functions.https.onRequest((req, res) => {
  // const url = "https://i.pinimg.com/originals/21/07/c6/2107c650f8be35fb218ad7941d565d41.jpg"
  // console.log('url', url);
  console.log('req params', req.params);
  console.log('req url', req.url);
  return fetch(req.params.url).then(response => response.buffer()).then( buffer => {
    return res.status(200).send(buffer);
  }).catch( err => {
    console.log(err);
    return err;
  })
});
