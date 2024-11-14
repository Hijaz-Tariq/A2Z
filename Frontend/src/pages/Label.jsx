// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { publicRequest } from "../requestMethods";
// import Barcode from "react-barcode";
// import ReactDOM from "react-dom";
// import { QRCodeSVG } from "qrcode.react";
// import html2pdf from "html2pdf.js";
// import { useSelector } from "react-redux";
// import { FaDownload } from "react-icons/fa";
// const stateNames = {
//   AR: "AR-اركانساس",
//   AZ: "AZ-اريزونا",
//   AL: "AL - موبيل الاباما",
//   ILL: "ILL -شيكاجو",
//   IN: "IN -انديانا -شيكاجو",
//   OK: "OK - اوكلاهوما",
//   OH: "OH- كليفلاند اوهايو",
//   ID: "ID- ايداهو",
//   PA: "PA-بنسلفانيا -فيلادلفيا",
//   TXH: "TX- هيوستن",
//   TXS: "TX-سان انطونيو",
//   TXD: "TX-دلس",
//   TN: "TN-ممفس تنسي",
//   GA: "GA-جورجيا-اطلانطا",
//   RI: "RI-رود ايلاند",
//   FLM: "FL-ميامي",
//   FLT: "FL- تامبا",
//   VA: "VA-فرجينيا",
//   "SC-NC": "SC-NC -كارولينا الشمالية والجنوبية",
//   CAL: "CA-كاليفورنيا-لوس انجلس",
//   CAS: "CA-سان فرانسسيكو كاليفورنيا",
//   KS: "KS-كانساس سيتي",
//   KY: "KY- كنتاكي",
//   CT: "CT-كونتكت",
//   LAP: "LA-باتون روج",
//   LAN: "LA-نيواورلينز",
//   LAS: "LA-شريفبورت",
//   MD: "MD-ماريلاند",
//   MA: "MA-بوستن",
//   MS: "MS-مسيسبي",
//   MO: "MO- سانت لويس",
//   MI: "MI-مشيغان",
//   MN: "MN-منيسوتا",
//   NJ: "NJ-نيوجيرسي",
//   NY: "NY-نيويورك",
//   NM: "NM-نيومكسكو",
//   WA: "WA-واشنطن -ستايل",
//   WI: "WI-ويسكانسن ملواكي",
// };

// const Label = () => {
//   const user = useSelector((state) => state.user);
//   const [parcel, setParcel] = useState({});
//   const location = useLocation();
//   const parcelData = location.state?.parcelData; // Get parcelData from state
//   const [inputs, setInputs] = useState({});
//   const [isPaid, setIsPaid] = useState(false);
//   const parcelId = location.pathname.split("/")[2];

//   useEffect(() => {
//     const getParcel = async () => {
//       try {
//         const res = await publicRequest.get("/parcels/find/" + parcelId);
//         setParcel(res.data);
//         setIsPaid(res.data.paid);
//         setRState(res.data.rState);
//         setOilQuantity(res.data.oilQuantity);
//         setOliveQuantity(res.data.oliveQuantity);
//         setCost(res.data.cost);
//         setSenderPhone(res.data.senderphone || ""); // Initialize sender phone
//         setRecipientPhone(res.data.recipientphone || ""); // Initialize recipient phone
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getParcel();
//   }, [parcelId]);

//   async function handleOnClick() {
//     const element = document.querySelector("#invoice");
//     html2pdf(element, {
//       margin: 20,
//     });
//   }

//   const total = parcel.oilQuantity + parcel.oliveQuantity;

//   useEffect(() => {
//     const printPages = () => {
//       const invoices = document.querySelectorAll("#invoice");
//       invoices.forEach((invoice, index) => {
//         const pageNumText = `Page ${index + 1} of ${invoices.length}`;
//         const footer = invoice.querySelector("footer");
//         if (footer) {
//           footer.innerHTML = pageNumText;
//         }
//       });
//     };

//     window.onbeforeprint = printPages;
//   }, []);

//   return (
//     <>
//       <button
//         onClick={handleOnClick}
//         className="flex items-center print:hidden"
//       >
//         <FaDownload className="w-4 h-4 mr-2" /> Download
//       </button>

//       {/* Calculate the total quantity */}
//       {Array.from({ length: total }).map((_, index) => (
//         <div key={index} id="invoice">
//           <div className="bg-white text-black my-2">
//             <div className="flex flex-col items-center">
//               <img
//                 src="/logo.png"
//                 alt=""
//                 height="200px"
//                 width="200px"
//                 className="p-2 m-2"
//               />
//               <h1 className="bg-white p-2 m-2 w-fit"></h1>
//             </div>
//             <div className="flex justify-between m-2 p-2">
//               <div className="flex flex-col">
//                 <label>{stateNames[parcel.rState] || parcel.rState}</label>
//                 <label className="p-2 m-2">{parcel.sendername}</label>
//                 <label className="flex-col bg-white">
//                   <div> {parcel.oilQuantity} :زيت</div>
//                   <div>زيتون:{parcel.oliveQuantity} </div>
//                 </label>
//                 <div className="p-2 m-2">
//                   <h1>{parcel.recipientname}</h1>
//                   <h1>{parcel.recipientphone}</h1>
//                   <h1>{parcel.to}</h1>
//                 </div>
//               </div>
//               <div className="flex flex-col w-50px bg-white">
//                 <QRCodeSVG
//                   value={"https://a2z-express.com/track/" + parcel._id}
//                 />
//                 {parcel.paid ? (
//                   <label className="flex-col ">P</label>
//                 ) : (
//                   <label className="flex justify-end">
//                     {(parcel.cost || 40) *
//                       (parcel.oilQuantity + parcel.oliveQuantity)}
//                   </label>
//                 )}
//               </div>
//             </div>

//             <h1 className="p-2 flex justify-center">
//               <Barcode
//                 format="CODE128"
//                 value={
//                   parcel.parcelTrack +
//                   `B` +
//                   parcel.oliveQuantity +
//                   `A` +
//                   parcel.oilQuantity +
//                   `-` +
//                   parcel.rState
//                 }
//               />
//             </h1>
//             <div className="flex justify-between p-2">
//               <h3 className="flex flex-col">{user.currentUser.fullname}</h3>
//               <h1 className="mt-4 p-4 flex flex-col">www.a2z-express.com</h1>
//               <footer></footer>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default Label;

//-------------------------------------------------------------------------------------------------------------11/12

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
import Barcode from "react-barcode";
import ReactDOM from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import { FaDownload } from "react-icons/fa";
const stateNames = {
  AR: "AR-اركانساس",
  AZ: "AZ-اريزونا",
  AL: "AL - موبيل الاباما",
  ILL: "ILL -شيكاجو",
  IN: "IN -انديانا -شيكاجو",
  OK: "OK - اوكلاهوما",
  OH: "OHCL- كليفلاند اوهايو",
  OHCS: "OHCS- كولومبوس اوهايو",
  ID: "ID- ايداهو",
  PA: "PA-بنسلفانيا -فيلادلفيا",
  TXH: "TX- هيوستن",
  TXS: "TX-سان انطونيو",
  TXD: "TX-دلس",
  TN: "TN-ممفس تنسي",
  GA: "GA-جورجيا-اطلانطا",
  RI: "RI-رود ايلاند",
  FLM: "FL-ميامي",
  FLT: "FL- تامبا",
  VA: "VA-فرجينيا",
  "SC-NC": "SC-NC -كارولينا الشمالية والجنوبية",
  CAL: "CA-كاليفورنيا-لوس انجلس",
  CAS: "CA-سان فرانسسيكو كاليفورنيا",
  CASO: "CA-سان دييغو كاليفورنيا",
  KS: "KS-كانساس سيتي",
  KY: "KY- كنتاكي",
  CT: "CT-كونتكت",
  LAP: "LA-باتون روج",
  LAN: "LA-نيواورلينز",
  LAS: "LA-شريفبورت",
  MD: "MD-ماريلاند",
  MA: "MA-بوستن",
  MS: "MS-مسيسبي",
  MO: "MO- سانت لويس",
  MOL: "MOL- ليز سامت",
  MI: "MI-مشيغان",
  MN: "MN-منيسوتا",
  NJ: "NJ-نيوجيرسي",
  NY: "NY-نيويورك",
  NM: "NM-نيومكسكو",
  WA: "WA-واشنطن -ستايل",
  WI: "WI-ويسكانسن ملواكي",
};

const Label = () => {
  const user = useSelector((state) => state.user);
  const [parcel, setParcel] = useState({});
  const location = useLocation();
  const parcelData = location.state?.parcelData; // Get parcelData from state
  const [inputs, setInputs] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const parcelId = location.pathname.split("/")[2];

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

  async function handleOnClick() {
    const element = document.querySelector("#invoice");
    html2pdf(element, {
      margin: 20,
    });
  }

  {
    /*  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setIsPaid(checked);
      setInputs((prev) => ({
        ...prev,
        paid: checked,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      if (inputs) {
        await publicRequest.put(`/parcels/${parcel._id}`, inputs);
        window.location.reload();
      } else {
        await publicRequest.put(`/parcels/${parcel._id}`, {
          status: 2,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
*/
  }

  const total = parcel.oilQuantity + parcel.oliveQuantity;

  useEffect(() => {
    const printPages = () => {
      const invoices = document.querySelectorAll("#invoice");
      invoices.forEach((invoice, index) => {
        const pageNumText = `Page ${index + 1} of ${invoices.length}`;
        const footer = invoice.querySelector("footer");
        if (footer) {
          footer.innerHTML = pageNumText;
        }
      });
    };

    window.onbeforeprint = printPages;
  }, []);

  return (
    <>
      <button
        onClick={handleOnClick}
        className="flex items-center print:hidden"
      >
        <FaDownload className="w-4 h-4 mr-2" /> Download
      </button>
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} id="invoice" className="p-3">
          <div className="bg-white text-black ">
            <div className="flex flex-col items-center">
              <img src="/logo.png" alt="" height="200px" width="200px" />
            </div>
            <div className="flex justify-between pt-5 mt-5">
              <div className="flex flex-col">
                {/* <label>Delivery State: {parcel.rState} </label> */}
                <label>{stateNames[parcel.rState] || parcel.rState}</label>
                <label className="p-1 m-1">
                  {parcel.sendername}
                  {/* {parcel._id} */}
                </label>
                <label className=" flex-col bg-white">
                  <div> {parcel.oilQuantity} :زيت</div>
                  <div>زيتون:{parcel.oliveQuantity} </div>
                </label>
                <label className="pt-3">{parcel.recipientname}</label>
                <label>{parcel.recipientphone}</label>
                <label>{parcel.to}</label>
              </div>
              <div className="flex flex-col w-50px bg-white">
                {/* <QRCodeSVG value="https://a2z-express.com/" /> */}
                <QRCodeSVG
                  value={"https://a2z-express.com/track/" + parcel._id}
                />
                {parcel.paid ? (
                  <label className=" flex-col " dir="rtl">
                    P
                  </label>
                ) : (
                  <label className=" flex-col ">
                    {(parcel.cost || 40) *
                      (parcel.oilQuantity + parcel.oliveQuantity)}
                  </label>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              {/* <label className="p-2 m-2 flex-col bg-white">{parcel.cost}</label> */}
              <></>
            </div>

            <h1 className="p-2 m-2 ">
              <Barcode
                format="CODE128"
                value={
                  parcel.parcelTrack +
                  `B` +
                  parcel.oliveQuantity +
                  `A` +
                  parcel.oilQuantity +
                  `-` +
                  parcel.rState
                }
              />
            </h1>
            {/* <h1 className=" ">www.a2z-express.com</h1> */}
            <div className="flex justify-between pt-2 mt-2">
              <h3 className="flex flex-col">{user.currentUser.fullname}</h3>
              <footer></footer>
            </div>
            <h1 className="flex flex-col pt-2 ">www.a2z-express.com</h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default Label;
