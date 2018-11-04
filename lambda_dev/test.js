require('dotenv').config();
let clarifai_api_key = process.env.CLARIFAI_API_KEY;

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: clarifai_api_key
});

exports.handler = function(event, context, callback) {
  // console.log('THE KEY: ');
  // console.log(clarifai_api_key);
  //
  console.log(event);

  app.models.predict("c386b7a870114f4a87477c0824499348", "https://image.shutterstock.com/image-photo/happy-loving-couple-isolated-on-260nw-433992562.jpg").then(
  // app.models.predict("c386b7a870114f4a87477c0824499348", "https://cdn.eblnews.com/sites/default/files/styles/latest/public/cover/2018-04/R7mDttcYpnk.jpg").then(
      function(response) {
        console.log("RESPONSE FROM CLARIFAI: ");
        console.log(response);

        let concepts = response.outputs[0].data.concepts;
        // console.log(response.outputs[0].data.concepts);

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(concepts, null, 2)
        });

      },
      function(err) {
        callback(null, {
          statusCode: 200,
          body: "blah"
        });
      }
    );



};
