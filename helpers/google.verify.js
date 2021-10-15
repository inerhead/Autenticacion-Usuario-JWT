const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleVerfy = async (token = '') =>  {
    console.log("process.env.GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  return payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
};


module.exports = {
    verifyToken: googleVerfy
};


