import React from 'react'
//import { Link } from 'gatsby'

import Layout from '../components/layout'

import axios from 'axios';

// require('dotenv').config();

let website = process.env.WEBSITE;


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
        // console.log(user);
        // console.log(email);
        // console.log(url);
        // console.log(byte);

        let body = {
            "user": user,
            "email": email,
            "imageURL": url,
            "imageB64": byte
        }


        let req = new XMLHttpRequest();
        let method = "POST";
        let testUrl = `http://${website}/image`;
        // let testUrl =  '/image'


        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // alert()
                // alert(req);
                console.log(this.responseText);
            }
        }


        req.open(method, testUrl, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // req.setRequestHeader("Access-Control-Allow-Origin", "*");

        req.send(JSON.stringify(body));


        // axios.post({
        //   "url": `http://${website}/image`,
        //   // "url": '/.netlify/functions/image',
        //   "headers": {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'application/json',
        //   }
        // }, body)
        // .then(function (response) {
        //
        //   console.log(response.data);
        //   // let daResponse = response;
        //   // console.log(response);
        //   // console.log(Object.keys(response));
        //
        //
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });




        //
        // axios({
        //   method: 'post',
        //   url: `http://${website}/image`,
        //   data: body,
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'application/json',
        //   }
        // })
        // .then(function (response) {
        //
        //   console.log(response.data);
        //   // let daResponse = response;
        //   // console.log(response);
        //   // console.log(Object.keys(response));
        //
        //
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
        //

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
            <h1>Hi people</h1>
            <p>Find out if you are in the friend zone.</p>
            <p>Submit any photo with only you and the person who may be friend
            zoning you to find out!</p>
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
      </Layout>
        )
    }
}

export default IndexPage
