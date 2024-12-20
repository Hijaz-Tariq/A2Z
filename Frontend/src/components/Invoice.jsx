// import React from "react";
// import * as AlertDialog from "@radix-ui/react-alert-dialog";
// import "../App.css";

// const LabelConfirm = () => (
//   <AlertDialog.Root>
//     <AlertDialog.Trigger asChild>
//       <button className="Button violet">Delete account</button>
//     </AlertDialog.Trigger>
//     <AlertDialog.Portal>
//       <AlertDialog.Overlay className="AlertDialogOverlay" />
//       <AlertDialog.Content className="AlertDialogContent">
//         <AlertDialog.Title className="AlertDialogTitle">
//           Are you absolutely sure?
//         </AlertDialog.Title>
//         <AlertDialog.Description className="AlertDialogDescription">
//           This action cannot be undone. This will permanently delete your
//           account and remove your data from our servers.
//         </AlertDialog.Description>
//         <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
//           <AlertDialog.Cancel asChild>
//             <button className="Button mauve">Cancel</button>
//           </AlertDialog.Cancel>
//           <AlertDialog.Action asChild>
//             <button className="Button red">Yes, delete account</button>
//           </AlertDialog.Action>
//         </div>
//       </AlertDialog.Content>
//     </AlertDialog.Portal>
//   </AlertDialog.Root>
// );

// export default LabelConfirm;

import { useNavigate } from "react-router-dom";
import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "../App.css";

const LabelConfirm = ({ show, handleClose, parcelData }) => {
  const navigate = useNavigate();
  if (!show) return null; // Don't render if not shown

  const handlePrintLabel = () => {
    // console.log("Printing label...", parcelData);
    if (parcelData) {
      const url = `/label/${parcelData._id}`;
      window.open(url, '_blank'); // Open in a new tab
    }
    handleClose(); // Close the dialog after printing
  };


  return (
    <AlertDialog.Root open={show} onOpenChange={handleClose}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Parcel Created Successfully
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            Your parcel has been created. Would you like to print the label?
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve" onClick={handleClose}>
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="Button green" onClick={handlePrintLabel}>
                Print Label
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default LabelConfirm;
