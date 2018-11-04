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

function getConcepts(response) {
  return new Promise((resolve, reject) => {
    resolve(response.rawData.outputs[0].data.concepts);
  });
}

function weddingConceptAlgo(concepts) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < concepts.length; i++) {
      let concept = concepts[i];
      if (concept.name === 'love') {
        resolve(concept.value);
      }
    }
    reject(0.10);
  })
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

  body = JSON.parse(body);

  if (body.imageURL !== undefined) {
    // image URL provided
    console.log("URL PREDICTION!!");

    predictURL("wedding", body.imageURL).then((response) => {
      console.log(response);
      return getConcepts(response);
    }).then((concepts) => {
      return weddingConceptAlgo(concepts);
    }).then((loveProbability) => {
      let friendZone = 1.0 - loveProbability;

      console.log("FRIENDZONE: ", friendZone);

      callback(null, {
          statusCode: 201,
          body: "HELLO!!!"
          // body: {"friendZone": friendZone}
        });
    })

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
