const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";
const dotenv = require("dotenv");
dotenv.config();

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  // const msgOptions = await client.messages.create({
  //   body: "Welcome",
  //   // from: "+16202343494",
  //   messagingServiceSid: "MG35afce3b2d59a5bfc436516b12926eaf",
  //   to: "+970569151111",
  // });
  try {
    // const message = await client.messages.create(msgOptions);
    
    console.log('Sent')
  } catch (error) {
    console.log(error);
  }
  // console.log(message.body);
}

createMessage("Hello From Twilio");
