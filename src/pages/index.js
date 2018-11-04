import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

class IndexPage extends React.Component {
    //const IndexPage = () => (
    constructor(props) {
        super(props);
        this.selectUrl = this.selectUrl.bind(this);
        this.selectFile = this.selectFile.bind(this);
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
            <form action="https://formspree.io/kevinl622@gmail.com" method="POST">
            <input type="text" name="name" size="25" placeholder="Your Name" required />
            <br />
            <br />
            <input type="email" name="_replyto" size="25" placeholder="Your Email" required />
            <br />
            <br />
            <p>Submit a URL link to the photo OR upload the image file.</p>
            <p>Choose an option</p>
            <input type="radio" name="Source"
            onClick={this.selectUrl} />
            URL
            <br />
            <input type="radio" name="Source"
            onClick={this.selectFile} />
            Upload File
            <br />
            <input id="URL" type="url" name="url" size="50" style={{visibility: "hidden"}}
                placeholder="Your Image URL. example: https://example.img"
                pattern="https://.*" />
            <br />
            <input id="byte" type="file" name="photo" style={{visibility: "hidden"}}
                accept="image/*" />
            <br />
            <br />
            <input type="submit" value="Submit" />
        </form>
        <script src="./controller/formlogic.js"></script>
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
        )
    }
}

export default IndexPage
