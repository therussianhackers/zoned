require('dotenv').config();
let clarafai_api_key = process.env.CLARAFAI_API_KEY;

exports.handler = function(event, context, callback) {
  console.log('THE KEY: ');
  console.log(clarafai_api_key);

  console.log(event);

  callback(null, {
    statusCode: 200,
    body: "blah"
  })


};
