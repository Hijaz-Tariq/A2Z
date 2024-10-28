import { useState } from "react";
import Quagga from "quagga";

const BarcodeReader = () => {
  const [code, setCode] = useState("");
  const [cameraStatus, setCameraStatus] = useState(false);

  const initReader = () => {
    setCameraStatus(true);
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#reader"),
        },
        decoder: {
          // readers: ["ean_reader"],
          readers: ["code_128_reader"],
        },
      },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
        // Quagga.onDetected(onDetected);
        Quagga.onDetected((data) => {
          console.log("detected", data.codeResult.code);
        });
      }
    );
  };

  //   const stopReader = () => {
  //     setCameraStatus(false);
  //     Quagga.stop();
  //   };

  //   const onDetected = (data) => {
  //     setCode(data.codeResult.code);
  //     stopReader();
  //     console.log(data);
  //   };

  const copyCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Código de barras copiado com sucesso!");
      })
      .catch(() => {
        alert("Erro ao copiar Código de barras!");
      });
  };

  return (
    <div>
      {/* <h1 className="text-h6 text-center">Barcode Reader QuaggaJs</h1> */}
      <div className="text-center">
        <button className="q-btn q-btn--primary" onClick={initReader}>
          Start Reading
        </button>
      </div>
      {code && (
        <p className="text-h6 text-center q-mt-lg">
          Código Lido: {code}
          <button onClick={copyCode} className="q-btn q-btn--blue">
            Copiar
          </button>
        </p>
      )}
      {cameraStatus && <div className="text-center" id="reader"></div>}
    </div>
  );
};

export default BarcodeReader;


// import { useState } from "react";
// import Quagga from "quagga";

// const BarcodeReader = ({ onBarcodeDetected }) => {
//   const [code, setCode] = useState("");
//   const [cameraStatus, setCameraStatus] = useState(false);

//   const initReader = () => {
//     setCameraStatus(true);
//     Quagga.init(
//       {
//         inputStream: {
//           name: "Live",
//           type: "LiveStream",
//           target: document.querySelector("#reader"),
//         },
//         decoder: {
//           readers: ["code_128_reader"],
//         },
//       },
//       (err) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log("Initialization finished. Ready to start");
//         Quagga.start();
//         Quagga.onDetected(onDetected);
//       }
//     );
//   };

//   const onDetected = (data) => {
//     const detectedCode = data.codeResult.code;
//     console.log("detected", detectedCode);

//     // Extract the parcel track from the barcode
//     const trackMatch = detectedCode.match(/(\d+)B&/);
//     if (trackMatch) {
//       const parcelTrack = trackMatch[1]; // Get the part before "B&"
//       setCode(parcelTrack);
//       onBarcodeDetected(parcelTrack); // Pass the track to the parent
//     } else {
//       alert("Invalid barcode format", detectedCode);
//     }
//   };

//   const copyCode = () => {
//     navigator.clipboard
//       .writeText(code)
//       .then(() => {
//         alert("Código de barras copiado com sucesso!");
//       })
//       .catch(() => {
//         alert("Erro ao copiar Código de barras!");
//       });
//   };

//   return (
//     <div>
//       <div className="text-center">
//         <button className="q-btn q-btn--primary" onClick={initReader}>
//           Start Reading
//         </button>
//       </div>
//       {code && (
//         <p className="text-h6 text-center q-mt-lg">
//           Código Lido: {code}
//           <button onClick={copyCode} className="q-btn q-btn--blue">
//             Copiar
//           </button>
//         </p>
//       )}
//       {cameraStatus && <div className="text-center" id="reader"></div>}
//     </div>
//   );
// };

// export default BarcodeReader;
