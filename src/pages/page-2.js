import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const SecondPage = () => (
  <Layout>
    <h1>Contact Us</h1>
    <p>Want to join our team? Send us a message.</p>
    <form method="POST" action="https://formspree.io/kevinl622@gmail.com">
        <input id="UserName" type="text" name="name" size="25"
            placeholder="Your Name" required />
        <br />
        <br />
        <input type="email" name="email" placeholder="Your Email"
            size="25" required />
        <br />
        <br />
        <textarea name="message" placeholder="Your Message" rows="5" cols="50" required />
        <br />
        <br />
        <button type="submit">Send</button>
    </form>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
