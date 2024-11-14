import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";
import { publicRequest } from "../requestMethods";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { GiCherry, GiJug } from "react-icons/gi";
import LabelConfirm from "../components/Invoice";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userRedux";
const NewParcel = () => {
  const user = useSelector((state) => state.user);
  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [senderPhone, setSenderPhone] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [oilQuantity, setOilQuantity] = useState(0);
  const [oliveQuantity, setOliveQuantity] = useState(0);
  const [rState, setRState] = useState(0);
  const [cost, setCost] = useState(40); // Default cost
  const [parcels, setParcels] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setIsPaid(checked);
      setInputs((prev) => ({
        ...prev,
        paid: checked, // Update paid status in inputs
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (name === "cost") {
        setCost(Number(value) || 0); // Ensure the cost is a number
      }
    }
  };

  useEffect(() => {
    const getParcels = async () => {
      try {
        const res = await publicRequest.get("/parcels");
        setParcels(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getParcels();
  }, []);

  const handleAddParcel = async () => {
    try {
      const res = await publicRequest.get("/parcels");
      const parcelsCount = res.data.length;
      const parcelTrack = `2410${parcelsCount + 1}`;
      const newParcelData = {
        ...inputs,
        isPaid,
        senderemail: user.currentUser.email,
        senderphone: senderPhone,
        recipientphone: recipientPhone,
        oilQuantity: oilQuantity,
        oliveQuantity: oliveQuantity,
        rState: rState,
        parcelTrack: parcelTrack,
      };

      const createResponse = await publicRequest.post(
        "/parcels",
        newParcelData
      );
      const newParcelId = createResponse.data._id;
      console.log(newParcelId);
      toast.success("Parcel has been successfully saved to the database.");
      setModalIsOpen(true);
      setParcelData({ ...newParcelData, _id: newParcelId });

      // Send SMS to the recipient after parcel is created
      const smsResponse = await publicRequest.post("/parcels/send-sms", {
        phoneNumber: newParcelData.recipientphone,
        message: `Your parcel with tracking number ${newParcelData.parcelTrack} has been successfully created.`,
      });

      if (smsResponse.data.success) {
        toast.success("SMS has been sent to the recipient.");
      } else {
        toast.error("Failed to send SMS.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const [parcelData, setParcelData] = useState([]);
  const totalCost = (oilQuantity + oliveQuantity) * cost;
  return (
    <div className="text-justify">
      <div className="relative flex items-end justify-end mr-[20%] mt-[3%]">
        <span
          className="flex items-center text-white font-semibold cursor-pointer"
          onClick={handleOpen}
        >
          <FaUser className="mr-[10px]" />
          {user.currentUser.fullname}
        </span>
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
      <div className="flex flex-col">
        <Link to="/myparcels" className="flex items-center">
          <FaArrowLeft className="text-[18px] m-2 cursor-pointer" />
          <span>رجوع</span>
        </Link>
      </div>
      <div className="m-[30px]  p-[20px] bg-white text-black">
        <div className="flex">
          <div className="m-[20px]">
            <div className="flex flex-col my-[20px]">
              <label htmlFor="">Sender Name</label>
              <input
                type="text"
                name="sendername"
                onChange={handleChange}
                placeholder="اسم المرسل"
                className="border-2 border-[#555] border-solid p-[10px] w-[300px] bg-white"
              />
              <div className="flex flex-col my-[20px]">
                <label htmlFor="">From</label>
                <input
                  type="text"
                  name="from"
                  onChange={handleChange}
                  placeholder="عنوان المرسل"
                  className="border-2 border-[#555] border-solid p-[10px] w-[300px] bg-white"
                />
              </div>
              <div className="flex flex-col my-[20px]">
                <label htmlFor="">Sender Phone</label>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={senderPhone}
                  onChange={setSenderPhone}
                  className="border-2 border-[#555] border-solid p-[10px] w-[300px] input-phone bg-white"
                  defaultCountry="PS"
                  international
                  withCountryCallingCode
                />
              </div>
            </div>

            <div className="flex flex-col my-[20px]">
              <label htmlFor="">Recipient Name</label>
              <input
                type="text"
                name="recipientname"
                onChange={handleChange}
                placeholder="اسم المستقبل"
                className="border-2 border-[#555] border-solid p-[10px] w-[300px] bg-white"
              />
            </div>
            <div className="flex flex-col my-[20px]">
              <label htmlFor="">To</label>
              <input
                type="text"
                name="to"
                onChange={handleChange}
                placeholder="عنوان المستقبل"
                className="border-2 border-[#555] border-solid p-[10px] w-[300px] bg-white"
              />
            </div>

            {/* <div className="flex flex-col my-[20px]">
              <label htmlFor="">Recipient Email</label>
              <input
                type="text"
                name="recipientemail"
                onChange={handleChange}
                placeholder="janedoe@gmail.com"
                className="border-2 border-[#555] border-solid p-[10px] w-[300px] bg-white"
              />
            </div> */}

            <div className="flex flex-col my-[20px] ">
              <label htmlFor="">Recipient Phone</label>
              <PhoneInput
                placeholder="Enter phone number"
                value={recipientPhone}
                onChange={setRecipientPhone}
                className="border-2 border-[#555] border-solid p-[10px] w-[300px] input-phone   inputStyle={{ backgroundColor: '#f0f0f0' }}"
                defaultCountry="US"
                international
                withCountryCallingCode
              />
            </div>
          </div>
          <div className="m-[20px]">
            <div className="flex flex-col my-[20px]">
              <label htmlFor="">العدد: </label>
              <div className="flex">
                <input
                  type="Number"
                  name="oilQuantity"
                  onChange={(e) => setOilQuantity(Number(e.target.value))}
                  placeholder="زيت"
                  className="border-2 border-[#555] border-solid p-[10px] w-[150px] bg-white"
                />
                <GiJug className="size-7" />
              </div>
              <div className="flex">
                <input
                  type="Number"
                  name="oliveQuantity"
                  onChange={(e) => setOliveQuantity(Number(e.target.value))}
                  placeholder="زيتون"
                  className="border-2 border-[#555] border-solid p-[10px] w-[150px] bg-white"
                />
                <GiCherry className="size-7" />
              </div>
            </div>
            <div className="flex flex-col my-[20px]">
              <label htmlFor="">سعر الوحدة</label>
              <input
                type="Number"
                name="cost"
                onChange={handleChange}
                placeholder="$40"
                className="border-2 border-[#555] border-solid p-[10px] w-[300px] bg-white"
                defaultValue="$40"
              />
            </div>
            <div className="flex flex-col my-[20px] ">
              <label htmlFor="">التاريخ</label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                placeholder="20/06/2024"
                className="border-2 border-[#555] border-solid p-[10px] w-[300px] bg-slate-400"
                onClick={(e) => e.target.showPicker()} // Opens the date picker on click
              />
            </div>
            <div className="flex flex-col my-[20px]">
              <label htmlFor="">بلد التسليم</label>
              <select
                name="rState"
                onChange={(e) => {
                  const selectedOption =
                    e.target.options[e.target.selectedIndex];
                  const recipientEmail = selectedOption.id + "@a2z-express.com";
                  setRState(String(e.target.value));
                  setInputs((prev) => ({
                    ...prev,
                    recipientemail: recipientEmail, // Set recipient email value
                  }));
                }}
                className="bg-white border-black"
              >
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
                  OHCl- كليفلاند اوهايو
                </option>
                <option value="OHCS" id="coloumbos">
                  OHCS- كولومبوس اوهايو
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
            <div className="flex flex-col my-[20px] ">
              <label htmlFor="">ملاحظات</label>
              <textarea
                type="text"
                name="note"
                onChange={handleChange}
                placeholder=""
                className="border-2 border-[#555] border-solid p-[10px] w-full bg-white"
              />
            </div>
            <div className="flex flex-col my-[20px]">
              <h1>Parcel Payment Status</h1>
              <label>
                <div className="bg-[#E9EB77]">
                  {" "}
                  المطلوب للدفع = $ {totalCost}
                </div>
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={handleChange}
                />
                {isPaid ? " مدفوع" : "  غير مدفوع"}
              </label>
            </div>
            <button
              className="bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[300px]"
              onClick={handleAddParcel}
            >
              انشاء
            </button>
            <LabelConfirm
              show={modalIsOpen}
              handleClose={() => setModalIsOpen(false)}
              parcelData={parcelData}
            />
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewParcel;
