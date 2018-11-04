require('dotenv').config();
let clarifai_api_key = process.env.CLARIFAI_API_KEY;
let fs = require('fs');

let atob = require('atob');

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: clarifai_api_key
});

let models = {
  'wedding': 'c386b7a870114f4a87477c0824499348'
};

function predictURL(modelType, imageURL) {
  return new Promise((resolve, reject) => {
    app.models.predict(models[modelType], imageURL).then(
      function(response) {
        resolve(response);
      },
      function(err) {
        console.log(err);
        reject(err);
      }
    );
  });
}

function predictBase64(modelType, imageB64) {
  return new Promise((resolve, reject) => {
    app.models.predict(models[modelType], {base64: imageB64}).then(
      function(response) {
        resolve(response);
      },
      function(err) {
        console.log(err);
        reject(err);
      }
    );
  });

}

exports.handler = function(event, context, callback) {

  console.log(event);

  let body = event.body;

  console.log("BODY: ");
  console.log(body);
  console.log(typeof body);

  body = JSON.parse(body);

  if (body.imageURL !== undefined) {
    // image URL provided
    console.log("URL PREDICTION!!");

    predictURL("wedding", body.imageURL).then((response) => {

      console.log(response);

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response, null, 2)
      });
    });

  } else {


    // image B64 provided

    console.log("B64 PREDICTION!!");
    return;

    let b64 = fs.readFileSync('./imagesTest/happy_couple.jpg');

    b64 = b64.toString('base64');

    predictBase64("wedding", b64).then((response) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response, null, 2)
      });
    });

  }





};
