import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

import '../components/index.css';

let clarifai_api_key = process.env.CLARIFAI_API_KEY;

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

function sendToClarifai(body) {
  return new Promise((resolve, reject) => {
    if (body.imageURL !== undefined) {
      console.log("URL PREDICTION!!");

      predictURL("wedding", body.imageURL).then((response) => {
        console.log(response);
        return getConcepts(response);
      }).then((concepts) => {
        return weddingConceptAlgo(concepts);
      }).then((loveProbability) => {
        let friendZone = 1.0 - loveProbability;

        resolve({
          "friendZone": friendZone
        });

      });

    } else {
      let b64 = "blah";

      predictBase64("wedding", b64).then((response) => {

        console.log("get back response from b64 processing");
      });

    }
  });


}


class IndexPage extends React.Component {
    //const IndexPage = () => (
    constructor(props) {
        super(props);
        this.selectUrl = this.selectUrl.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.predictImage = this.predictImage.bind(this);
    }

    predictImage(e) {
        e.preventDefault();
        let user = document.getElementById('UserName').value;
        let email = document.getElementById('UserEmail').value;
        let url = document.getElementById('URL').value;
        //let byte = document.getElementById('byte').value;
        let byte = undefined;

        let body = {
            "user": user,
            "email": email,
            "imageURL": url,
            "imageB64": byte
        }

        sendToClarifai(body).then((result) => {
          let resultDiv = document.getElementById('result');
          resultDiv.innerHTML = '';

          let img = document.createElement("img");

          let friendZoneP = document.createElement('p');
          let percentage = document.createTextNode("FriendZoned Probability: " + Math.round(100 * result.friendZone) + '%');
          friendZoneP.appendChild(percentage);

          if (body.imageURL !== undefined) {
            img.src = body.imageURL;
          }

          resultDiv.appendChild(friendZoneP);
          resultDiv.appendChild(img);

          console.log(result);
        })

    }

    selectUrl() {
        document.getElementById('URL').style.visibility='visible';
        document.getElementById('byte').style.visibility='hidden';
    }

    selectFile() {
        document.getElementById('byte').style.visibility='visible';
        document.getElementById('URL').style.visibility='hidden';
    }
    render(){
        return (
            <Layout>
            <h1>Friend Zone Photo Detector</h1>
            <p>Find out if you are in the friend zone.</p>
            <p>Submit any photo with two people and find out if it's a Friend
            Zone situation!</p>
            <form id="formID">
                <input id="UserName" type="text" name="name" size="25"
                    placeholder="Your Name" required />
                <br />
                <br />
                <input id="UserEmail" type="email" name="_replyto" size="25"
                    placeholder="Your Email" required />
                <br />
                <br />
                <br />
                <p>Submit a URL link to the photo OR upload the image file.</p>
                <p>Choose an option</p>
                <input type="radio" name="Source"
                onClick={this.selectUrl} />
                <label>URL</label>
                <input id="URL" type="url" name="url" size="50" style={{visibility: "hidden"}}
                    placeholder="Your Image URL. example: https://example.img"
                    pattern="https://.*" />
                <br />
                <br />
                <input type="radio" name="Source"
                onClick={this.selectFile} />
                Upload File
                <input id="byte" type="file" name="photo" style={{visibility: "hidden"}}
                    accept="image/*" />
                <br />
                <br />
                <input onClick={this.predictImage} type="submit" value="Submit" />
            </form>

            <Link to="/page-2/">Contact Us</Link>
            <div id="result"></div>
      </Layout>
        )
    }
}

export default IndexPage
