import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRequest } from "../requestMethods";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { GiCherry, GiJug } from "react-icons/gi";
import LabelConfirm from "../components/Invoice";
const NewParcel = () => {
  const [inputs, setInputs] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [senderPhone, setSenderPhone] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [oilQuantity, setOilQuantity] = useState(0);
  const [oliveQuantity, setOliveQuantity] = useState(0);
  const [rState, setRState] = useState(0);
  const [cost, setCost] = useState(40); // Default cost
  const [parcels, setParcels] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
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

      // setParcelData(newParcelData);
    } catch (error) {
      console.log(error);
    }
  };
  const [parcelData, setParcelData] = useState([]);
  const totalCost = (oilQuantity + oliveQuantity) * cost;
  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <div className="flex">
        <div className="m-[20px]">
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Sender Name</label>
            <input
              type="text"
              name="sendername"
              onChange={handleChange}
              placeholder="James Doe"
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
            <div className="flex flex-col my-[20px]">
              <label htmlFor="">From</label>
              <input
                type="text"
                name="from"
                onChange={handleChange}
                placeholder="Ontario USA"
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
              <label htmlFor="">Sender Email</label>
              <input
                type="text"
                name="senderemail"
                onChange={handleChange}
                placeholder="jamesdoe@gmail.com"
                className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
              />
            </div>
          </div>

          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Recipient Name</label>
            <input
              type="text"
              name="recipientname"
              onChange={handleChange}
              placeholder="Jane Doe"
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">To</label>
            <input
              type="text"
              name="to"
              onChange={handleChange}
              placeholder="Michigan, USA"
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>

          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Recipient Email</label>
            <input
              type="text"
              name="recipientemail"
              onChange={handleChange}
              placeholder="janedoe@gmail.com"
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
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
            <label htmlFor="">العدد: </label>
            <div className="flex">
              <input
                type="Number"
                name="oilQuantity"
                onChange={(e) => setOilQuantity(Number(e.target.value))}
                placeholder="زيت"
                className="border-2 border-[#555] border-solid p-[10px] w-[150px]"
              />
              <GiJug className="size-7" />
            </div>
            <div className="flex">
              <input
                type="Number"
                name="oliveQuantity"
                onChange={(e) => setOliveQuantity(Number(e.target.value))}
                placeholder="زيتون"
                className="border-2 border-[#555] border-solid p-[10px] w-[150px]"
              />
              <GiCherry className="size-7" />
            </div>
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">تنكة Cost</label>
            <input
              type="Number"
              name="cost"
              onChange={handleChange}
              placeholder="$40"
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
              defaultValue="$40"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Date</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              placeholder="20/06/2024"
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">بلد التسليم</label>
            <select
              name="rState"
              onChange={(e) => setRState(String(e.target.value))}
            >
              <option value="AR">AR-اركانساس</option>
              <option value="AZ">AZ-اريزونا</option>
              <option value="AL">AL - موبيل الاباما</option>
              <option value="ILL">ILL -شيكاجو </option>
              <option value="IN">IN -انديانا -شيكاجو</option>
              <option value="OK">OK - اوكلاهوما</option>
              <option value="OH">OH- كليفلاند اوهايو</option>
              <option value="ID">ID- ايداهو</option>
              <option value="PA">PA-بنسلفانيا -فيلادلفيا</option>
              <option value="TXH">TX- هيوستن</option>
              <option value="TXS">TX-سان انطونيو</option>
              <option value="TXD">TX-دلس</option>
              <option value="TN">TN-ممفس تنسي</option>
              <option value="GA">GA-جورجيا-اطلانطا </option>
              <option value="RI">RI-رود ايلاند</option>
              <option value="FLM">FL-ميامي</option>
              <option value="FLT">FL- تامبا</option>
              <option value="VA">VA-فرجينيا</option>
              <option value="SC-NC">SC-NC -كارولينا الشمالية والجنوبية</option>
              <option value="CAL">CA-كاليفورنيا-لوس انجلس </option>
              <option value="CAS">CA-سان فرانسسيكو كاليفورنيا</option>
              <option value="KS">KS-كانساس سيتي</option>
              <option value="KY">KY- كنتاكي</option>
              <option value="CT">CT-كونتكت</option>
              <option value="LAP">LA-باتون روج</option>
              <option value="LAN">LA-نيواورلينز</option>
              <option value="LAS">LA-شريفبورت </option>
              <option value="MD">MD-ماريلاند</option>
              <option value="MA">MA-بوستن</option>
              <option value="MS">MS-مسيسبي</option>
              <option value="MO">MO- سانت لويس </option>
              <option value="MI">MI-مشيغان</option>
              <option value="MN">MN-منيسوتا</option>
              <option value="NJ">NJ-نيوجيرسي</option>
              <option value="NY">NY-نيويورك</option>
              <option value="NM">NM-نيومكسكو</option>
              <option value="WA">WA-واشنطن -ستايل</option>
              <option value="WI">WI-ويسكانسن ملواكي</option>
            </select>
          </div>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="">Note</label>
            <textarea
              type="text"
              name="note"
              onChange={handleChange}
              placeholder="Perishable goods"
              className="border-2 border-[#555] border-solid p-[10px] w-[300px]"
            />
          </div>
          <div className="flex flex-col my-[20px]">
            <h1>Parcel Payment Status</h1>
            <label>
              <div className="bg-[#E9EB77]"> المطلوب للدفع = $ {totalCost}</div>
              <input type="checkbox" checked={isPaid} onChange={handleChange} />
              {isPaid ? " Paid" : " Unpaid"}
            </label>
          </div>
          <button
            className="bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[300px]"
            onClick={handleAddParcel}
          >
            Create
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
  );
};

export default NewParcel;
