import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "../styles/UploadAsset.css"; // Se añadirá después

const UploadAsset = () => {
  return (
    <div className="upload-asset">
      <h3>Subir asset</h3>
      <div className="upload-box">
        <FaCloudUploadAlt />
        <p>Subir archivo</p>
      </div>
    </div>
  );
};

export default UploadAsset;
