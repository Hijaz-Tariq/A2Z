import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import OTP from "./Otp"; // Import the OTP component you defined
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneVerification = ({ onPhoneVerified }) => {
  const [phone, setPhone] = useState(""); // Phone input state
  const [otp, setOtp] = useState(""); // OTP input state
  const user = useSelector((state) => state.user);
  const [generatedOtp, setGeneratedOtp] = useState(null); // OTP to be generated
  const [showPhoneModal, setShowPhoneModal] = useState(true); // Show phone number modal
  const [showOtpModal, setShowOtpModal] = useState(false); // Show OTP modal
const dispatch = useDispatch()
  const handlePhoneSubmit = async () => {
    if (phone) {
      // Generate a 6-digit OTP
      const generated = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOtp(generated);
      console.log("Generated OTP:", generated); // Log OTP for now

 // Show OTP modal
 setShowPhoneModal(false);
 setShowOtpModal(true);

  // Send SMS to the recipient after parcel is created
  const smsResponse = await publicRequest.post("/parcels/send-sms", {
    phoneNumber: phone,
    message: `Your OTP Code is : ${generated} .`,
  });

  if (smsResponse.data.success) {
   console.log('success')
  } else {
    console.log("Failed to send SMS.");
  }

     
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  const handleOtpSubmit = async () => {
    if (otp === generatedOtp.toString()) {
      console.log("OTP confirmed successfully");
      alert("Phone number confirmed!");

      // Here you make the API call to update the user's phone number
      try {
        const response = await publicRequest.put("/users/update-phone", {
          userId: user.currentUser._id, // Send user ID from Redux
          phoneNumber: phone, // Send the updated phone number
        });

        if (response.data.success) {
          alert("Phone number updated successfully!");
          onPhoneVerified(phone); // Callback to parent to update the phone
          setShowOtpModal(false);
          // Dispatch action to update the phone in Redux store
        dispatch({
          type: "UPDATE_PHONE",
          payload: phone, // Pass the updated phone number to Redux
        });
        } else {
          alert("Failed to update phone number.");
        }
      } catch (error) {
        console.error("Error updating phone number:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        {/* Phone Number Modal */}
        {showPhoneModal && (
          <>
            <h2 className="text-xl font-bold mb-4 text-black">Enter Your Phone Number</h2>
            {/* <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="p-2 w-full border border-gray-300 rounded mb-4"
            /> */}

            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              // onChange={setSenderPhone}
              // onChange={(e) => setPhone(e.target.value)}
              onChange = {setPhone}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px] input-phone bg-white text-black"
              defaultCountry="US"
              international
              withCountryCallingCode
            />
            <button
              onClick={handlePhoneSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded "
            >
              Submit Phone
            </button>
          </>
        )}

        {/* OTP Modal */}
        {showOtpModal && (
          <>
            <h2 className="text-xl font-bold mb-4 text-black">Enter OTP</h2>
            <OTP
              separator={<span>-</span>}
              value={otp}
              onChange={setOtp}
              length={6} // OTP length is usually 6 digits
            />
            <button
              onClick={handleOtpSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded  mt-4"
            >
              Confirm OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneVerification;
