import "./styles.css";
import exifr from "exifr";
import heic2any from "heic2any";
import { useState } from "react";
import Maps from "./Map";

export default function App() {
  const [imgSrc, setImgSrc] = useState("");
  const [imgData, setImgData] = useState({});
  const convertImage = (file) => {
    const blobURL = URL.createObjectURL(file);
    fetch(blobURL)
      .then((res) => res.blob())
      .then((blob) => heic2any({ blob }))
      .then((conversionResult) => {
        setImgSrc(conversionResult);
      })
      .catch((e) => {});
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    convertImage(file);
    exifr
      .parse(file)
      .then((output) => {
        setImgData(output);
      })
      .catch((e) => {});
  };

  const renderData = () => {
    const arr = [];
    let lat = "";
    let long = "";

    Object.keys(imgData).forEach((val) => {
      if (typeof imgData[val] !== "object") {
        if (val.toLowerCase() === "latitude") {
          lat = imgData[val];
        }

        if (val.toLowerCase() === "longitude") {
          long = imgData[val];
        }
        arr.push(
          <tr key={val}>
            <td>{val}</td>
            <td>{imgData[val]}</td>
          </tr>
        );
      }
    });
    if (lat && long) {
      arr.unshift(
        <tr key="area">
          <td>Area of Image</td>
          <td colSpan={4}>
            <Maps lat={lat} long={long} />
          </td>
        </tr>
      );
    }
    if (imgSrc) {
      arr.unshift(
        <tr key="image">
          <td>Image</td>
          <td colSpan={4}>
            <img
              src={URL.createObjectURL(imgSrc)}
              alt="preview..."
              width="400"
              height="400"
            />
          </td>
        </tr>
      );
    }

    return arr;
  };

  return (
    <>
      <input
        type="file"
        id="file"
        accept=".jpg, .png, .heif, .heic"
        onChange={handleChange}
      />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {Object.keys(imgData).length > 0 ? (
          <table style={{ width: "500px" }}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{renderData()}</tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
