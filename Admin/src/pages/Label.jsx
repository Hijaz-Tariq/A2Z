
//-------------------------------------------------------------------
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import Barcode from "react-barcode";
import ReactDOM from "react-dom";
import { QRCodeSVG } from "qrcode.react";
const stateNames = {
  AR: "AR-اركانساس",
  AZ: "AZ-اريزونا",
  AL: "AL - موبيل الاباما",
  ILL: "ILL -شيكاجو",
  IN: "IN -انديانا -شيكاجو",
  OK: "OK - اوكلاهوما",
  OH: "OH- كليفلاند اوهايو",
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
  MI: "MI-مشيغان",
  MN: "MN-منيسوتا",
  NJ: "NJ-نيوجيرسي",
  NY: "NY-نيويورك",
  NM: "NM-نيومكسكو",
  WA: "WA-واشنطن -ستايل",
  WI: "WI-ويسكانسن ملواكي",
};

const Label = () => {
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


  const handleChange = (e) => {
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

  return (
    <>
      <div className="bg-white ">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt=""
            height="200px"
            width="200px"
            className=" p-2 m-2"
          />
          {/* <h1>{parcel._id}</h1> */}
          <h1 className="bg-white p-2 m-2 w-fit">
            {/* Track: {parcel.parcelTrack}+{parcel.oilQuantity} */}
            {parcel.parcelTrack +
              `B` +
              parcel.oliveQuantity +
              `A` +
              parcel.oilQuantity +
              `-` +
              parcel.rState}
          </h1>
        </div>
        <div className="flex justify-between m-2 p-2">
          <div className="flex flex-col">
            {/* <label>Delivery State: {parcel.rState} </label> */}
            <label>{stateNames[parcel.rState] || parcel.rState}</label>
            <label className="p-2 m-2">
              {parcel.sendername}
              {/* {parcel._id} */}
            </label>
            <label className=" flex-col bg-white">
              <div> {parcel.oilQuantity} :زيت</div>
              <div>زيتون:{parcel.oliveQuantity} </div>
            </label>
          </div>
          <div className="flex flex-col w-50px bg-white">
            {/* <QRCodeSVG value="https://a2z-express.com/" /> */}
            <QRCodeSVG value={"https://a2z-express.com/track/" + parcel._id} />
            {parcel.paid ? (
              <label className=" flex-col ">P</label>
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
        <h1 className="p-2 m-2 ">{parcel.recipientname}</h1>
        <h1 className="p-2 m-2 ">{parcel.recipientphone}</h1>
        <h1 className="p-2 m-2 ">{parcel.to}</h1>
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
        <h1 className="p-2 m-2 ">www.a2z-express.com</h1>
      </div>
    </>
  );
};

export default Label;




