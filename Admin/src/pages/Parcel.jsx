// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { publicRequest } from "../requestMethods";

// const Parcel = () => {
//   const [parcel, setParcel] = useState({});
//   const location = useLocation();
//   const parcelId = location.pathname.split("/")[2];
//   const [inputs, setInputs] = useState({});
//   const [isPaid, setIsPaid] = useState(false);

//   const handleChange = (e) => {
//     const { name, type, checked, value } = e.target;
//     console.log(parcel.paid);
//     if (type === "checkbox") {
//       setIsPaid(checked);
//       setInputs((prev) => ({
//         ...prev,
//         paid: checked, // Update the paid status in inputs
//       }));
//     } else {
//       setInputs((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   useEffect(() => {
//     const getParcel = async () => {
//       try {
//         const res = await publicRequest.get("/parcels/find/" + parcelId);
//         setParcel(res.data);
//         setIsPaid(res.data.paid);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getParcel();
//   }, [parcelId]);

//   const handleUpdate = async () => {
//     try {
//       if (inputs) {
//         await publicRequest.put(`/parcels/${parcel._id}`, inputs);
//         window.location.reload();
//       } else {
//         await publicRequest.put(`/parcels/${parcel._id}`, {
//           status: 2,
//         });
//         window.location.reload();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="m-[30px] bg-[#fff] p-[20px]">
//       <h2 className="font-semibold">New Parcel</h2>
//       <div className="flex">
//         <div className="m-[20px]">
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">From</label>
//             <input
//               type="text"
//               placeholder={parcel.from}
//               name="from"
//               onChange={handleChange}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">To</label>
//             <input
//               type="text"
//               name="to"
//               onChange={handleChange}
//               placeholder={parcel.to}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Sender Name</label>
//             <input
//               type="text"
//               name="sendername"
//               onChange={handleChange}
//               placeholder={parcel.sendername}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Recipient Name</label>
//             <input
//               type="text"
//               name="recipientname"
//               onChange={handleChange}
//               placeholder={parcel.recipientname}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Sender Email</label>
//             <input
//               type="text"
//               name="senderemail"
//               onChange={handleChange}
//               placeholder={parcel.senderemail}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>

//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Recipient Email</label>
//             <input
//               type="text"
//               name="recipientemail"
//               onChange={handleChange}
//               placeholder={parcel.recipientemail}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Sender Phone</label>
//             <phone
//               type="text"
//               name="senderphone"
//               onChange={handleChange}
//               placeholder={parcel.senderphone}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>

//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Recipient Phone</label>
//             <input
//               type="text"
//               name="recipientphone"
//               onChange={handleChange}
//               placeholder={parcel.recipientphone}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//         </div>
//         <div className="m-[20px]">
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Weight</label>
//             <input
//               type="Number"
//               name="weight"
//               onChange={handleChange}
//               placeholder={parcel.weight}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Cost</label>
//             <input
//               type="Number"
//               name="cost"
//               onChange={handleChange}
//               placeholder={parcel.cost}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Date</label>
//             <input
//               type="date"
//               name="date"
//               onChange={handleChange}
//               placeholder={parcel.date}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label htmlFor="">Note</label>
//             <textarea
//               type="text"
//               name="note"
//               onChange={handleChange}
//               placeholder={parcel.note}
//               className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
//             />
//           </div>
//           <div className="flex flex-col my-[20px]">
//             <label>
//               <input type="checkbox" checked={isPaid} onChange={handleChange} />
//               {isPaid ? "Paid" : "Unpaid"}
//             </label>
//           </div>
//           <button
//             className="bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[300px]"
//             onClick={handleUpdate}
//           >
//             Update
//           </button>
//         </div>
//         <div className="flex flex-col">
//           <h2 className="font-semibold">Feedback</h2>
//           <span>Goods received in good condition.</span>
//           {parcel.status === 0 ? (
//             <span className="text-red-500 text-[18px]">Pending</span>
//           ) : (
//             <span className="text-green-500 text-[18px]">Delivered</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Parcel;

//------------------------------------------------------------28/10-19:40

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { GiCherry, GiJug } from "react-icons/gi";
import LabelConfirm from "../components/Invoice";

const Parcel = () => {
  const [parcel, setParcel] = useState({});
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [senderPhone, setSenderPhone] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [rState, setRState] = useState("");
  const [oilQuantity, setOilQuantity] = useState("");
  const [oliveQuantity, setOliveQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(true);
  // const handleChange = (e) => {
  //   const { name, type, checked, value } = e.target;
  //   if (type === "checkbox") {
  //     setIsPaid(checked);
  //     setInputs((prev) => ({
  //       ...prev,
  //       paid: checked,
  //     }));
  //   } else {
  //     setInputs((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setIsPaid(checked);
      setInputs((prev) => ({
        ...prev,
        paid: checked,
      }));
    } else if (
      name === "oilQuantity" ||
      name === "oliveQuantity" ||
      name === "rState" ||
      name === "cost"
    ) {
      // Directly update state for these specific fields
      if (name === "oilQuantity") {
        setOilQuantity(value);
      } else if (name === "oliveQuantity") {
        setOliveQuantity(value);
      } else if (name === "rState") {
        setRState(value);
      } else if (name === "cost") {
        setCost(value);
      }

      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
        setIsPaid(res.data.paid);
        setRState(res.data.rState);
        setOilQuantity(res.data.oilQuantity);
        setOliveQuantity(res.data.oliveQuantity);
        setCost(res.data.cost);
        setSenderPhone(res.data.senderphone || ""); // Initialize sender phone
        setRecipientPhone(res.data.recipientphone || ""); // Initialize recipient phone
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleUpdate = async () => {
    try {
      const updatedInputs = {
        ...inputs,
        senderphone: senderPhone,
        recipientphone: recipientPhone,
        rState: rState,
        oilQuantity: oilQuantity,
        oliveQuantity: oliveQuantity,
        cost: cost,
      };
      await publicRequest.put(`/parcels/${parcel._id}`, updatedInputs);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const [parcelData, setParcelData] = useState([]);
  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <h2 className="font-semibold">
        {parcel.parcelTrack +
          `B` +
          parcel.oliveQuantity +
          `A` +
          parcel.oilQuantity +
          `-` +
          parcel.rState}
      </h2>
      <div className="flex">
        <div className="m-[20px]">
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">From</label>
            <input
              type="text"
              placeholder={parcel.from}
              name="from"
              onChange={handleChange}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">To</label>
            <input
              type="text"
              name="to"
              onChange={handleChange}
              placeholder={parcel.to}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Sender Name</label>
            <input
              type="text"
              name="sendername"
              onChange={handleChange}
              placeholder={parcel.sendername}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Recipient Name</label>
            <input
              type="text"
              name="recipientname"
              onChange={handleChange}
              placeholder={parcel.recipientname}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Sender Email</label>
            <input
              type="text"
              name="senderemail"
              onChange={handleChange}
              placeholder={parcel.senderemail}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>

          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Recipient Email</label>
            <input
              type="text"
              name="recipientemail"
              onChange={handleChange}
              placeholder={parcel.recipientemail}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Sender Phone</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={senderPhone}
              onChange={setSenderPhone}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px] input-phone"
              defaultCountry="PS"
              international
              withCountryCallingCode
            />
          </div>

          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Recipient Phone</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={recipientPhone}
              onChange={setRecipientPhone}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px] input-phone"
              defaultCountry="US"
              international
              withCountryCallingCode
            />
          </div>
        </div>
        <div className="m-[20px]">
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Quantity ~ Parcel#</label>
            <div className="flex">
              <input
                type="Number"
                name="oilQuantity"
                // value={oilQuantity}
                onChange={handleChange}
                placeholder={parcel.oilQuantity}
                className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
              />
              <GiJug className="size-7 inline-flex pt-1" />
            </div>
            <div className="flex">
              <input
                type="Number"
                name="oliveQuantity"
                onChange={handleChange}
                placeholder={parcel.oliveQuantity}
                className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
              />
              <GiCherry className="size-7 pt-1" />
            </div>
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Cost</label>
            <input
              type="Number"
              name="cost"
              onChange={handleChange}
              placeholder={parcel.cost}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Date</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              placeholder={parcel.date}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">بلد التسليم</label>

            <select name="rState" onChange={handleChange} value={parcel.rState}>
            <option value="" disabled selected>
                     اختر الولاية
                 </option>
                <option value="AR" id="Arkansas">
                  AR-اركانساس
                </option>
                <option value="AZ" id="Arizona">
                  AZ-اريزونا
                </option>
                <option value="AL" id="Alabama">
                  AL - موبيل الاباما
                </option>
                <option value="ILL" id="Chicago">
                  ILL -شيكاجو
                </option>
                <option value="IN" id="Indiana">
                  IN -انديانا -شيكاجو
                </option>
                <option value="OK" id="Oklahoma">
                  OK - اوكلاهوما
                </option>
                <option value="OHCl" id="Cleaveland">
                  OH- كليفلاند اوهايو
                </option>
                <option value="OHCS" id="coloumbos">
                  OH- كولومبوس اوهايو
                </option>
                <option value="ID" id="Idaho">
                  ID- ايداهو
                </option>
                <option value="PA" id="Philadelphia">
                  PA-بنسلفانيا -فيلادلفيا
                </option>
                <option value="TXH" id="Houston">
                  TX- هيوستن
                </option>
                <option value="TXS" id="SanAntonio">
                  TX-سان انطونيو
                </option>
                <option value="TXD" id="Dallas">
                  TX-دلس
                </option>
                <option value="TN" id="Tennessee">
                  TN-ممفس تنسي
                </option>
                <option value="GA" id="Georgia">
                  GA-جورجيا-اطلانطا
                </option>
                <option value="RI" id="RhodeIsland">
                  RI-رود ايلاند
                </option>
                <option value="FLM" id="Miami">
                  FL-ميامي
                </option>
                <option value="FLT" id="Tampa">
                  FL- تامبا
                </option>
                <option value="VA" id="Virginia">
                  VA-فرجينيا
                </option>
                <option value="SC-NC" id="NsCarolina">
                  SC-NC -كارولينا الشمالية والجنوبية
                </option>
                <option value="CAL" id="LosAngeles">
                  CA-كاليفورنيا-لوس انجلس
                </option>
                <option value="CAS" id="SanFrancisco">
                  CA-سان فرانسسيكو كاليفورنيا
                </option>
                <option value="CASO" id="SanDiego">
                  CA-سان دييغو كاليفورنيا
                </option>
                <option value="KS" id="Kansas">
                  KS-كانساس سيتي
                </option>
                <option value="KY" id="Kentucky">
                  KY- كنتاكي
                </option>
                <option value="CT" id="Connecticut">
                  CT-كونتكت
                </option>
                <option value="LAP" id="BatonRouge">
                  LA-باتون روج
                </option>
                <option value="LAN" id="NewOrleans">
                  LA-نيواورلينز
                </option>
                <option value="LAS" id="Shreveport">
                  LA-شريفبورت
                </option>
                <option value="MD" id="Maryland">
                  MD-ماريلاند
                </option>
                <option value="MA" id="Boston">
                  MA-بوستن
                </option>
                <option value="MS" id="Mississippi">
                  MS-مسيسبي
                </option>
                <option value="MOS" id="stlouis">
                  MOS- سانت لويس
                </option>
                <option value="MOL" id="leessummit">
                  MOL- ليز سامت          
                 </option>
                <option value="MI" id="Michigan">
                  MI-مشيغان
                </option>
                <option value="MN" id="Minnesota">
                  MN-منيسوتا
                </option>
                <option value="NJ" id="NewJersey">
                  NJ-نيوجيرسي
                </option>
                <option value="NY" id="NewYork">
                  NY-نيويورك
                </option>
                <option value="NM" id="NewMexico">
                  NM-نيومكسكو
                </option>
                <option value="WA" id="Washington">
                  WA-واشنطن -ستايل
                </option>
                <option value="WI" id="Wisconsin">
                  WI-ويسكانسن ملواكي
                </option>
            </select>
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Note</label>
            <textarea
              type="text"
              name="note"
              onChange={handleChange}
              placeholder={parcel.note}
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label>
              <input type="checkbox" checked={isPaid} onChange={handleChange} />
              {isPaid ? "Paid" : "Unpaid"}
            </label>
          </div>
          <button
            className="bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[300px]"
            onClick={handleUpdate}
          >
            Update
          </button>
          {parcel && (
            <LabelConfirm
              show={modalIsOpen}
              handleClose={() => setModalIsOpen(false)}
              parcelData={parcel}
            />
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold">Feedback</h2>
          <span>Goods received in good condition.</span>
          {parcel.status === 0 ? (
            <span className="text-red-500 text-[18px]">Pending</span>
          ) : (
            <span className="text-green-500 text-[18px]">Delivered</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parcel;
