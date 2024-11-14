// controllers/smsController.js
const twilio = require('twilio');

// Twilio credentials (consider using environment variables or a separate config file)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = async (req, res) => {
  const { phoneNumber, message } = req.body;

//   if (!phoneNumber || !message) {
//     return res.status(400).json({ success: false, error: 'Phone number and message are required' });
//   }

  try {
    // // Send SMS using Twilio
    // const messageResponse = await client.messages.create({
    //   body: message,
    //   from: process.env.TWILIO_PHONE_NUMBER,  // Your Twilio phone number
    //   to: phoneNumber,
    // });

    // // Return success response
    // res.status(200).json({ success: true, messageSid: messageResponse.sid });
    console.log(message)
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, error: 'Failed to send SMS' });
  }
};

module.exports = {
  sendSMS,
};
