require('dotenv').config();
let clarifai_api_key = process.env.CLARIFAI_API_KEY;
let fs = require('fs');

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

  console.log(body);

  if (body.imageURL !== undefined) {
    // image URL provided
    console.log("URL PREDICTION!!");

    predictURL("wedding", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBOxOxfEOLj9qws6fPUmYhVnqN8Is0S0gskWIguB0DqeA42nf7eQ").then((response) => {

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response, null, 2)
      });
    });

  } else {
    // image B64 provided

    console.log("B64 PREDICTION!!");

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
