// import { DataGrid } from "@mui/x-data-grid";

// import { useState, useEffect } from "react";
// import { FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { publicRequest } from "../requestMethods";
// const Parcels = () => {
//   const [data, setData] = useState([]);

//   const columns = [
//     { field: "_id", headerName: "ID", width: 90 },
//     { field: "sendername", headerName: "Sender Name", width: 150 },
//     { field: "recipientname", headerName: "Recipient Name", width: 150 },
//     { field: "from", headerName: "From", width: 130 },
//     { field: "to", headerName: "To", width: 130 },
//     { field: "status", headerName: "Status", width: 130 },
//     { field: "rState", headerName: "State", width: 130 },

//     // { field: "cost", headerName: "Cost ($)", type: "number", width: 130 },
//     {
//       field: "edit",
//       headerName: "Edit",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={`/parcel/${params.row._id}`}>
//               <button className="bg-teal-500 text-white cursor-pointer w-[70px]">
//                 Edit
//               </button>
//             </Link>
//           </>
//         );
//       },
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <>
//             <FaTrash
//               className="text-red-500 cursor-pointer m-2"
//               onClick={() => handleDelete(params.row._id)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   useEffect(() => {
//     const getParcels = async () => {
//       try {
//         const res = await publicRequest.get("/parcels");
//         setData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getParcels();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await publicRequest.delete(`/parcels/${id}`);
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="m-[30px] bg-[#fff] p-[20px]">
//       <div className="flex items-center justify-between">
//         <h1 className="m-[20px] text-[20px]">All Parcels</h1>
//         <Link to="/newparcel">
//           <button className="bg-[#1e1e1e] text-white p-[10px] cursor-pointer">
//             New Parcel
//           </button>
//         </Link>
//       </div>
//       <DataGrid
//         rows={data}
//         getRowId={(row) => row._id}
//         columns={columns}
//         checkboxSelection
//       />
//     </div>
//   );
// };

// export default Parcels;

//---------------------------------------------------

// import { DataGrid } from "@mui/x-data-grid";
// import { useState, useEffect } from "react";
// import { FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { publicRequest } from "../requestMethods";

// const Parcels = () => {
//   const [data, setData] = useState([]);
//   const [selectionModel, setSelectionModel] = useState([]);

//   const columns = [
//     { field: "_id", headerName: "ID", width: 90 },
//     { field: "sendername", headerName: "Sender Name", width: 150 },
//     { field: "recipientname", headerName: "Recipient Name", width: 150 },
//     { field: "from", headerName: "From", width: 130 },
//     { field: "to", headerName: "To", width: 130 },
//     { field: "status", headerName: "Status", width: 130 },
//     { field: "rState", headerName: "State", width: 130 },
//     {
//       field: "edit",
//       headerName: "Edit",
//       width: 150,
//       renderCell: (params) => (
//         <Link to={`/parcel/${params.row._id}`}>
//           <button className="bg-teal-500 text-white cursor-pointer w-[70px]">
//             Edit
//           </button>
//         </Link>
//       ),
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       width: 150,
//       renderCell: (params) => (
//         <FaTrash
//           className="text-red-500 cursor-pointer m-2"
//           onClick={() => handleDelete(params.row._id)}
//         />
//       ),
//     },
//   ];

//   useEffect(() => {
//     const getParcels = async () => {
//       try {
//         const res = await publicRequest.get("/parcels");
//         setData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getParcels();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await publicRequest.delete(`/parcels/${id}`);
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleRowSelectionChange = (newSelection) => {
//     setSelectionModel(newSelection);
//     console.log("Selected rows:", newSelection);
//     // Optionally, log detailed data of selected rows
//     const selectedRows = data.filter((row) => newSelection.includes(row._id));
//     console.log("Selected rows data:", selectedRows);
//   };

//   return (
//     <div className="m-[30px] bg-[#fff] p-[20px]">
//       <div className="flex items-center justify-between">
//         <h1 className="m-[20px] text-[20px]">All Parcels</h1>
//         <Link to="/newparcel">
//           <button className="bg-[#1e1e1e] text-white p-[10px] cursor-pointer">
//             New Parcel
//           </button>
//         </Link>
//       </div>
//       <DataGrid
//         rows={data}
//         getRowId={(row) => row._id}
//         columns={columns}
//         checkboxSelection
//         onRowSelectionModelChange={handleRowSelectionChange} // Use onRowSelectionModelChange to log selection changes
//       />
//     </div>
//   );
// };

// export default Parcels;

//---------------------------------------------------------
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { Select, MenuItem, Button } from "@mui/material"; // Import MUI components
import { ToastContainer, toast } from "react-toastify";
const Parcels = () => {
  const [data, setData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null); // Initialize with null instead of empty string

  const columns = [
    // { field: "_id", headerName: "ID", width: 90 },
    { field: "parcelTrack", headerName: "Track", width: 90 },
    { field: "sendername", headerName: "Sender Name", width: 150 },
    { field: "recipientname", headerName: "Recipient Name", width: 150 },
    { field: "recipientphone", headerName: "R-Phone", width: 150 },
    // { field: "from", headerName: "From", width: 130 },
    { field: "to", headerName: "To", width: 130 },
      { field: "rState", headerName: "State", width: 130 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Link to={`/parcel/${params.row._id}`}>
          <button className="bg-teal-500 text-white cursor-pointer w-[70px]">
          تعديل
          </button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <FaTrash
          className="text-red-500 cursor-pointer m-2"
          onClick={() => handleDelete(params.row._id)}
        />
      ),
    },
  ];

  useEffect(() => {
    const getParcels = async () => {
      try {
        const res = await publicRequest.get("/parcels");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getParcels();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/parcels/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value); // Update the selected status
  };

  // const handleUpdateStatus = async () => {
  //   if (selectionModel.length === 0 || statusFilter === null) return; // Ensure statusFilter is selected

  //   try {
  //     // Update selected parcels with the new status
  //     await Promise.all(
  //       selectionModel.map(async (id) => {
  //         await publicRequest.put(`/parcels/${id}`, { status: statusFilter });
  //       })
  //     );
  //     // Refresh data after update
  //     const updatedData = data.map((parcel) =>
  //       selectionModel.includes(parcel._id)
  //         ? { ...parcel, status: statusFilter }
  //         : parcel
  //     );
  //     setData(updatedData);
  //     setSelectionModel([]); // Clear selection after update
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleRowSelectionChange = (newSelection) => {
  //   setSelectionModel(newSelection);
  //   console.log("Selected rows:", newSelection);

  // };

  const handleUpdateStatus = async () => {
    if (selectionModel.length === 0 || statusFilter === null) return; // Ensure statusFilter is selected

    try {
      // Update selected parcels with the new status
      const updatedParcels = await Promise.all(
        selectionModel.map(async (id) => {
          const parcelToUpdate = data.find((parcel) => parcel._id === id);
          if (parcelToUpdate) {
            // Update parcel status
            await publicRequest.put(`/parcels/${id}`, { status: statusFilter });

            // Send SMS for the updated parcel
            const smsResponse = await publicRequest.post("/parcels/send-sms", {
              phoneNumber: parcelToUpdate.recipientphone,
              message: `Your parcel with tracking number ${parcelToUpdate.parcelTrack} has been updated to ${statusFilter}.`,
            });

            // Handle SMS response
            if (smsResponse.data.success) {
              console.log(`SMS sent to ${parcelToUpdate.recipientphone}`);
            } else {
              console.log(
                `Failed to send SMS to ${parcelToUpdate.recipientphone}`
              );
            }

            return { ...parcelToUpdate, status: statusFilter }; // Return updated parcel with the new status
          }
          return null;
        })
      );

      // Filter out any null results in case some parcels couldn't be updated
      const validUpdatedParcels = updatedParcels.filter(
        (parcel) => parcel !== null
      );

      // Update the data state with the newly updated parcels
      setData((prevData) =>
        prevData.map((parcel) =>
          validUpdatedParcels.some(
            (updatedParcel) => updatedParcel._id === parcel._id
          )
            ? { ...parcel, status: statusFilter }
            : parcel
        )
      );

      setSelectionModel([]); // Clear selection after update
      toast.success("Status updated and SMS sent to recipients.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status or send SMS.");
    }
    // window.location.reload();
  };

  const handleRowSelectionChange = (newSelection) => {
    setSelectionModel(newSelection);
    console.log("Selected rows:", newSelection);

    // If there are selected rows, log the recipientphone of each selected row
    if (newSelection.length > 0) {
      newSelection.forEach((selectedId) => {
        const selectedRow = data.find((row) => row._id === selectedId);
        if (selectedRow) {
          console.log("Recipient Phone:", selectedRow.recipientphone);
        }
      });
    }
  };

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="m-[20px] text-[20px]">All Parcels</h1>

        {/* Status Update Dropdown and Button */}
        <div className="flex items-center gap-4">
          <Select
            value={statusFilter || ""} // Default to empty string if null
            onChange={handleStatusChange}
            displayEmpty
            className="w-[200px]"
            placeholder="Select Status"
          >
            <MenuItem value={0}>Picked Up</MenuItem>
            <MenuItem value={1}>In Transit</MenuItem>
            <MenuItem value={2}>Out for Delivery</MenuItem>
            <MenuItem value={3}>Delivered</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateStatus}
            disabled={selectionModel.length === 0 || statusFilter === null} // Check for null statusFilter
          >
            Update Status
          </Button>
        </div>
      </div>

      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelectionChange}
      />
    </div>
  );
};

export default Parcels;
