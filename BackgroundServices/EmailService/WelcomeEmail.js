// const ejs = require("ejs");
// const dotenv = require("dotenv");
// const sendMail = require("../helpers/sendmail");
// const sendSMS = require("../helpers/sendSMS");
// const User = require("../models/User");
// const CryptoJs = require("crypto-js");

// dotenv.config();

// const sendWelcomeEmail = async () => {
//   const users = await User.find({ status: 0 });

//   if (users.length > 0) {
//     for (let user of users) {
//       const hashedpassword = CryptoJs.AES.decrypt(
//         user.password,
//         process.env.PASS
//       );
//       const originalPassword = hashedpassword.toString(CryptoJs.enc.Utf8);

//       ejs.renderFile(
//         "templates/welcome.ejs",
//         {
//           fullname: user.fullname,
//           password: originalPassword,
//           email: user.email,
//         },
//         async (err, info) => {
//           let messageOption = {
//             from: process.env.EMAIL,
//             to: user.email,
//             subject: "Welcome to A2Z",
//             html: info,
//           };

//           try {
//             sendMail(messageOption);
//             sendMaswndSMSil();
//             await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       );
//     }
//   }
// };

// module.exports = { sendWelcomeEmail };


const dotenv = require("dotenv");
// const sendMail = require("../helpers/sendmail");  // No longer needed for SMS
const sendSMS = require("../helpers/sendSMS");
const User = require("../models/User");
const CryptoJs = require("crypto-js");

dotenv.config();

const sendWelcomeSMS = async () => {
  const users = await User.find({ status: 0 });

  if (users.length > 0) {
    for (let user of users) {
      const hashedpassword = CryptoJs.AES.decrypt(
        user.password,
        process.env.PASS
      );
      const originalPassword = hashedpassword.toString(CryptoJs.enc.Utf8);

      // Compose the SMS message (SMS should be short and concise)
      const smsMessage = `Welcome ${user.fullname}! Your account has been created successfully. Your password is: ${originalPassword}. Enjoy using A2Z!`;

      const smsOptions = {
        to: user.phone,  // Assuming the user's phone number is stored in 'phone'
        message: smsMessage,
      };

      try {
        // Send the SMS
        await sendSMS(smsOptions);

        // Update the user's status to 1 (indicating the welcome message has been sent)
        await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });

        console.log(`Welcome SMS sent to ${user.phone}`);
      } catch (error) {
        console.log(`Error sending SMS to ${user.phone}:`, error);
      }
    }
  }
};

module.exports = { sendWelcomeSMS };
