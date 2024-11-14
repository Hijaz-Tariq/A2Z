const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendmail");
const Parcel = require("../models/Parcel");

dotenv.config();

const sendParcelDeliveredEmail = async () => {
  const parcels = await Parcel.find({ status: 2 });

  if (parcels.length > 0) {
    for (let parcel of parcels) {
      ejs.renderFile(
        "templates/deliveredparcel.ejs",
        {
          sendername: parcel.sendername,
          from: parcel.from,
          to: parcel.to,
          recipientname: parcel.recipientname,
          cost: parcel.cost,
          weight: parcel.weight,
          note: parcel.note,
        },
        async (err, data) => {
          let messageOption = {
            from: process.env.EMAIL,
            to: parcel.senderemail,
            subject: "Your parcel has been delivered.",
            html: data,
          };

          try {
            await sendMail(messageOption);
            console.log('Sent')
          } catch (error) {
            console.log(error);
          }
        }
      );

      ejs.renderFile(
        "templates/deliveredparcel.ejs",
        {
          sendername: parcel.sendername,
          from: parcel.from,
          to: parcel.to,
          recipientname: parcel.recipientname,
          cost: parcel.cost,
          weight: parcel.weight,
          note: parcel.note,
        },
        async (err, data) => {
          let messageOption = {
            from: process.env.EMAIL,
            to: parcel.recipientemail,
            subject: "Your parcel has been delivered.",
            html: data,
          };

          try {
            await sendMail(messageOption);
            await Parcel.findByIdAndUpdate(parcel._id, { $set: { status: 1 } });
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  }
};

module.exports = { sendParcelDeliveredEmail };


// const ejs = require("ejs");
// const dotenv = require("dotenv");
// const sendMail = require("../helpers/sendmail");
// const Parcel = require("../models/Parcel");

// dotenv.config();

// const sendParcelDeliveredEmail = async () => {
//   console.log("sendParcelDeliveredEmail function called");
//   // Find all parcels with status 2 (delivered)
//   const parcels = await Parcel.find({ status: 2 });

//   if (parcels.length > 0) {
//     for (let parcel of parcels) {
//       // Prepare the data for rendering the EJS template
//       const emailData = {
//         sendername: parcel.sendername,
//         from: parcel.from,
//         to: parcel.to,
//         recipientname: parcel.recipientname,
//         cost: parcel.cost,
//         weight: parcel.weight,
//         note: parcel.note,
//       };
// console.log('test')
//       try {
//         // Render the email template for the sender
//         const senderEmailHTML = await ejs.renderFile("templates/deliveredparcel.ejs", emailData);
//         const senderMessageOption = {
//           from: process.env.EMAIL,
//           to: parcel.senderemail,
//           subject: "Your parcel has been delivered.",
//           html: senderEmailHTML,
//         };

//         // Send email to sender
//         // await sendMail(senderMessageOption);
//         console.log(`Email sent to sender: ${parcel.senderemail}`);
//       } catch (error) {
//         console.log(`Error sending email to sender: ${error}`);
//       }

//       try {
//         // Render the email template for the recipient
//         const recipientEmailHTML = await ejs.renderFile("templates/deliveredparcel.ejs", emailData);
//         const recipientMessageOption = {
//           from: process.env.EMAIL,
//           to: parcel.recipientemail,
//           subject: "Your parcel has been delivered.",
//           html: recipientEmailHTML,
//         };

//         // Send email to recipient
//         // await sendMail(recipientMessageOption);

//         // Update parcel status to 1 (delivered)
//         await Parcel.findByIdAndUpdate(parcel._id, { $set: { status: 1 } });
//         console.log(`Email sent to recipient: ${parcel.recipientemail}`);
//       } catch (error) {
//         console.log(`Error sending email to recipient: ${error}`);
//       }
//     }
//   }
// };

// module.exports = { sendParcelDeliveredEmail };
