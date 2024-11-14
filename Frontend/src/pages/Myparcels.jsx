// import { useEffect, useState } from "react";
// import { FaUser } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { publicRequest } from "../requestMethods";
// import { useDispatch } from "react-redux";
// import { logOut } from "../redux/userRedux";
// import BarcodeReader from "../components/Barcode";
// import Otp from "../components/OtpSend";

// const MyParcels = () => {
//   const [open, setOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const user = useSelector((state) => state.user);
//   const [parcelTracks, setParcelTracks] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getParcels = async () => {
//       try {
//         const res = await publicRequest.post("/parcels/me", {
//           email: user.currentUser.email,
//         });
//         setData(res.data);
//         const tracks = res.data.map((parcel) => parcel.parcelTrack);
//         setParcelTracks(tracks);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getParcels();
//   }, [user.currentUser.email]);

//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   const handleLogout = () => {
//     dispatch(logOut());
//     navigate("/login");
//   };

//   const handleBarcodeDetected = (code) => {
//     const matchingParcel = data.find((parcel) =>
//       parcel.parcelTrack.startsWith(code)
//     );
//     if (matchingParcel) {
//       navigate(`/parcel/${matchingParcel._id}`);
//     } else {
//       alert("No matching parcel found");
//     }
//   };

// const phone = user.currentUser.phone

//   const handleConfirm = () => {
//     console.log('Clicked', phone)
//   }

//   // const handleBarcodeDetected = (code) => {
//   //   const matchingParcel = data.find(parcel => parcel.parcelTrack.startsWith(code));
//   //   if (matchingParcel) {
//   //     navigate(`/parcel/${matchingParcel._id}`);
//   //   } else {
//   //     alert("No matching parcel found");
//   //   }
//   // };

//   return (
//     <div>
//       <div className="relative flex items-end justify-end mr-[20%] mt-[3%]">
//         <span
//           className="flex items-center text-white font-semibold cursor-pointer"
//           onClick={handleOpen}
//         >
//           <FaUser className="mr-[10px]" />
//           {user.currentUser.fullname}
//         </span>
//         {open && (
//           <div className="absolute top-[20px] right-0 h-[200px] w-[250px] bg-[#adadad] z-[999] shadow-xl">
//             <ul className="flex flex-col items-center justify-center mt-[10px]">
//               <Link to="/newparcel">
//                 <li className="hover:text-[#fff] my-[5px] cursor-pointer">
//                   طرد جديد
//                 </li>
//               </Link>
//               <Link to="/allparcels">
//                 <li className="hover:text-[#fff] my-[5px] cursor-pointer">
//                   جميع الطرود
//                 </li>
//               </Link>
//               <li className="hover:text-[#fff] my-[5px] cursor-pointer">
//                 Statements
//               </li>
//               <li
//                 className="hover:text-[#fff] my-[5px] cursor-pointer"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//       <div className="flex justify-evenly px-[5%]">
//         <div className="h-[90vh] w-[60vw] rounded-md">
//           {/* <h2 className="text-[18px] text-[#D9D9D9] p-[20px]">My Parcels{user.currentUser.status}</h2> */}
//           <button
//           className="bg-blue-600 rounded-lg p-2"
//            onClick={handleConfirm}>{phone? <BarcodeReader onBarcodeDetected={handleBarcodeDetected} />
//            :'Add Phone'

//            }
//            </button>

//           {data.map((parcel, index) => (
//             <Link key={index} to={`/parcel/${parcel._id}`}>
//               <div className="flex justify-between bg-[#D9D9D9] h-[150px] w-[60vw] m-[20px] p-[20px] cursor-pointer">
//                 <div>
//                   <ul>
//                     <li>Status: {parcel.status}</li>
//                     <li>From: {parcel.from}</li>
//                     <li>
//                       Sender: {parcel.sendername} {parcel.senderphone}
//                     </li>
//                     <li>
//                       Recipient: {parcel.recipientname} {parcel.recipientphone}
//                     </li>
//                     <li>
//                       Track:{" "}
//                       {parcel.parcelTrack +
//                         `B` +
//                         parcel.oliveQuantity +
//                         `A` +
//                         parcel.oilQuantity +
//                         `-` +
//                         parcel.rState}
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="flex flex-col">
//                   <span>To: {parcel.to}</span>
//                   <button
//                     className={(() => {
//                       switch (parcel.status) {
//                         case 0:
//                           return "bg-[#555] text-white w-[100px] cursor-pointer padding-[5px]";
//                         case 1:
//                           return "bg-[#ffa500] text-white w-[100px] cursor-pointer padding-[5px]"; // Example for 'Pending'
//                         case 2:
//                           return "bg-[#45de52] text-white w-[100px] cursor-pointer padding-[5px]"; // Example for 'In Transit'
//                         case 3:
//                           return "bg-[#007bff] text-white w-[100px] cursor-pointer padding-[5px]"; // Example for 'Delivered'
//                         default:
//                           return "bg-[#ccc] text-white w-[100px] cursor-pointer padding-[5px]"; // Fallback style
//                       }
//                     })()}
//                   >
//                     {(() => {
//                       switch (parcel.status) {
//                         case 0:
//                           return "Picked up";
//                         case 1:
//                           return "In Transit";
//                         case 2:
//                           return "Out of Delivery";
//                         case 3:
//                           return "Delivered";
//                         default:
//                           return "Unknown Status"; // Fallback text
//                       }
//                     })()}
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyParcels;

//--------------------------------------------------------------------

import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { logOut, updatePhone } from "../redux/userRedux";
import BarcodeReader from "../components/Barcode";
import PhoneVerification from "../components/PhoneVerification"; // Import the new component

const MyParcels = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [parcelTracks, setParcelTracks] = useState([]);
  const [phone, setPhone] = useState(user.currentUser.phone); // Store phone number in state
  const [showPhoneVerification, setShowPhoneVerification] = useState(false); // State to show PhoneVerification modal
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getParcels = async () => {
      try {
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
        const tracks = res.data.map((parcel) => parcel.parcelTrack);
        setParcelTracks(tracks);
      } catch (error) {
        console.log(error);
      }
    };
    getParcels();
  }, [user.currentUser.email]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const handleBarcodeDetected = (code) => {
    const matchingParcel = data.find((parcel) =>
      parcel.parcelTrack.startsWith(code)
    );
    if (matchingParcel) {
      navigate(`/parcel/${matchingParcel._id}`);
    } else {
      alert("No matching parcel found");
    }
  };

 

  // const handleConfirmPhone = (newPhone) => {
  //   // Update the phone state after verification
  //   setPhone(newPhone);
  //   setShowPhoneVerification(false); // Close the PhoneVerification modal
  //   dispatch(updatePhone(newPhone));
  
  //   // Filter parcels with status 1 (In Transit) and log their IDs
  //   const inTransitParcels = data.filter(parcel => parcel.status === 1);
  //   const inTransitIds = inTransitParcels.map(parcel => parcel._id);
    
  //   console.log('In Transit Parcel IDs:', inTransitIds);
  // };

  //---------------------------------------------------------------------

//   const handleConfirmPhone = (newPhone) => {
//   // Update the phone state after verification
//   setPhone(newPhone);
//   setShowPhoneVerification(false); // Close the PhoneVerification modal
//   dispatch(updatePhone(newPhone));

//   // Filter parcels with status 1 (In Transit)
//   const updatedParcels = data.map(parcel => {
//     if (parcel.status === 1) {
//       // Change status to 2 (Out for Delivery)
//       return { ...parcel, status: 2 };
//     }
//     return parcel; // Keep other parcels unchanged
//   });

//   // Update the state with the modified parcels data
//   setData(updatedParcels);

//   // Optionally, log the updated parcel IDs
//   const updatedInTransitIds = updatedParcels.filter(parcel => parcel.status === 2).map(parcel => parcel._id);
//   console.log('Updated In Transit Parcel IDs to Out for Delivery:', updatedInTransitIds);

//   // Optionally, send an API request to update the status in the backend
//   // const updateStatus = async () => {
//   //   try {
//   //     await publicRequest.put("/parcels/updateStatus", {
//   //       parcels: updatedInTransitIds,
//   //       newStatus: 2, // Out for Delivery
//   //     });
//   //     console.log("Parcel statuses updated on the server");
//   //   } catch (error) {
//   //     console.error("Error updating parcel statuses:", error);
//   //   }
//   // };
//   // updateStatus();
// };
//-------------------------------------------------------------------------------

// const handleConfirmPhone = async (newPhone) => {
//   setPhone(newPhone);
//   setShowPhoneVerification(false); // Close the PhoneVerification modal
//   dispatch(updatePhone(newPhone));

//   const updatedParcels = data.map(parcel => {
//     if (parcel.status === 1) {
//       return { ...parcel, status: 2 };
//     }
//     return parcel;
//   });

//   setData(updatedParcels);

//   const updatedInTransitIds = updatedParcels.filter(parcel => parcel.status === 2).map(parcel => parcel._id);
//   console.log('Updated In Transit Parcel IDs to Out for Delivery:', updatedInTransitIds);

//   // Loop through each parcel and update it individually
//   for (let parcel of updatedParcels) {
//     if (parcel.status === 2) {
//       try {
//         await publicRequest.put(`/parcels/${parcel._id}`, { status: 2 });
//         console.log(`Updated parcel ${parcel._id} to status 2`);
        
//   // const smsResponse = await publicRequest.post("/parcels/send-sms", {
//   //             phoneNumber: parcelToUpdate.recipientphone,
//   //             message: `Your parcel with tracking number ${parcelToUpdate.parcelTrack} has been updated to ${statusFilter}.`,
//   //           });
  
//   //           // Handle SMS response
//   //           if (smsResponse.data.success) {
//   //             console.log(`SMS sent to ${parcelToUpdate.recipientphone}`);
//   //           } else {
//   //             console.log(`Failed to send SMS to ${parcelToUpdate.recipientphone}`);
//   //           }

//       } catch (error) {
//         console.error(`Error updating parcel ${parcel._id}:`, error);
//       }
//     }
//   }
// };



const handleConfirmPhone = async (newPhone) => {
  setPhone(newPhone);
  setShowPhoneVerification(false); // Close the PhoneVerification modal
  dispatch(updatePhone(newPhone));

  // Update parcels with status 1 to status 2
  const updatedParcels = data.map((parcel) => {
    if (parcel.status === 1) {
      return { ...parcel, status: 2 };
    }
    return parcel;
  });

  setData(updatedParcels);

  const updatedInTransitIds = updatedParcels
    .filter((parcel) => parcel.status === 2)
    .map((parcel) => parcel._id);
  console.log("Updated In Transit Parcel IDs to Out for Delivery:", updatedInTransitIds);

  try {
    // Use Promise.all to handle both status update and SMS sending concurrently
    const updatedParcelPromises = updatedParcels.map(async (parcel) => {
      if (parcel.status === 2) {
        try {
          // Update parcel status
          await publicRequest.put(`/parcels/${parcel._id}`, { status: 2 });
          console.log(`Updated parcel ${parcel._id} to status 2`);

          // Send SMS for the updated parcel
          const smsResponse = await publicRequest.post("/parcels/send-sms", {
            phoneNumber: parcel.recipientphone,
            message: `Your parcel with tracking number ${parcel.parcelTrack} has been updated to ${parcel.status}.`,
          });

          // Handle SMS response
          if (smsResponse.data.success) {
            console.log(`SMS sent to ${parcel.recipientphone}`);
          } else {
            console.log(`Failed to send SMS to ${parcel.recipientphone}`);
          }

          return { ...parcel, status: 2 }; // Return the updated parcel object
        } catch (error) {
          console.error(`Error updating or sending SMS for parcel ${parcel._id}:`, error);
        }
      }
      return null; // If no update required, return null
    });

    // Wait for all updates and SMS sends to complete
    const updatedParcelsWithStatus = await Promise.all(updatedParcelPromises);

    // Filter out null parcels (if any were not updated)
    const validUpdatedParcels = updatedParcelsWithStatus.filter(parcel => parcel !== null);

    // Update the state with the new status for updated parcels
    setData((prevData) =>
      prevData.map((parcel) =>
        validUpdatedParcels.some((updatedParcel) => updatedParcel._id === parcel._id)
          ? { ...parcel, status: 2 }
          : parcel
      )
    );

    console.log("Parcels updated and SMS sent successfully.");
  } catch (error) {
    console.error("Error updating parcels or sending SMS:", error);
    console.log("Failed to update parcels or send SMS.");
  }
};


  return (
    <div>
      <div className="relative flex items-end justify-end mr-[20%] mt-[3%]">
        <span
          className="flex items-center text-white font-semibold cursor-pointer"
          onClick={handleOpen}
        >
          <FaUser className="mr-[10px]" />
          {user.currentUser.fullname}
        </span>
        <span>{user.currentUser.phone}</span>
        {open && (
          <div className="absolute top-[20px] right-0 h-[200px] w-[250px] bg-[#adadad] z-[999] shadow-xl">
            <ul className="flex flex-col items-center justify-center mt-[10px]">
              <Link to="/newparcel">
                <li className="hover:text-[#fff] my-[5px] cursor-pointer">
                  طرد جديد
                </li>
              </Link>
              <Link to="/allparcels">
                <li className="hover:text-[#fff] my-[5px] cursor-pointer">
                  جميع الطرود
                </li>
              </Link>
              <li className="hover:text-[#fff] my-[5px] cursor-pointer">
                Statements
              </li>
              <li
                className="hover:text-[#fff] my-[5px] cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-evenly px-[5%]">
        <div className="h-[90vh] w-[60vw] rounded-md">
          {phone ? (
            <BarcodeReader onBarcodeDetected={handleBarcodeDetected} />
          ) : (
            <button
              className="bg-blue-600 rounded-lg p-2"
              onClick={() => setShowPhoneVerification(true)} // Show phone verification modal
            >
              Add Phone
            </button>
          )}

          {/* <button
            className="bg-blue-600 rounded-lg p-2"
            onClick={() => setShowPhoneVerification(true)} // Show phone verification modal
          >
            {phone ? (
              <BarcodeReader onBarcodeDetected={handleBarcodeDetected} />
            ) : (
              "Add Phone"
            )}
          </button> */}
          {data.map((parcel, index) => (
            <Link key={index} to={`/parcel/${parcel._id}`}>
              <div className="flex justify-between bg-[#D9D9D9] h-[150px] w-[60vw] m-[20px] p-[20px] cursor-pointer">
                <div>
                  <ul>
                    <li>Status: {parcel.status}</li>
                    <li>From: {parcel.from}</li>
                    <li>
                      Sender: {parcel.sendername} {parcel.senderphone}
                    </li>
                    <li>
                      Recipient: {parcel.recipientname} {parcel.recipientphone}
                    </li>
                    <li>
                      Track:{" "}
                      {parcel.parcelTrack +
                        `B` +
                        parcel.oliveQuantity +
                        `A` +
                        parcel.oilQuantity +
                        `-` +
                        parcel.rState}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col">
                  <span>To: {parcel.to}</span>
                  <button
                    className={(() => {
                      switch (parcel.status) {
                        case 0:
                          return "bg-[#555] text-white w-[100px] cursor-pointer padding-[5px]";
                        case 1:
                          return "bg-[#ffa500] text-white w-[100px] cursor-pointer padding-[5px]"; // Example for 'Pending'
                        case 2:
                          return "bg-[#45de52] text-white w-[100px] cursor-pointer padding-[5px]"; // Example for 'In Transit'
                        case 3:
                          return "bg-[#007bff] text-white w-[100px] cursor-pointer padding-[5px]"; // Example for 'Delivered'
                        default:
                          return "bg-[#ccc] text-white w-[100px] cursor-pointer padding-[5px]"; // Fallback style
                      }
                    })()}
                  >
                    {(() => {
                      switch (parcel.status) {
                        case 0:
                          return "Picked up";
                        case 1:
                          return "In Transit";
                        case 2:
                          return "Out of Delivery";
                        case 3:
                          return "Delivered";
                        default:
                          return "Unknown Status"; // Fallback text
                      }
                    })()}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Render the PhoneVerification modal when needed */}
      {showPhoneVerification && (
        <PhoneVerification onPhoneVerified={handleConfirmPhone} />
      )}
    </div>
  );
};

export default MyParcels;
