import React from "react";
import "../styles/AssetCard.css";

const AssetCard = ({ image, title, author, formats, category }) => {
  return (
    <div className="asset-card">
      {/* Imagen del asset */}
      <div className="asset-image">
        <img src={image} alt={title} />
      </div>

      {/* Información del asset */}
      <div className="asset-info">
        <div className="asset-title-author">
          <h3 className="asset-title">{title}</h3>
          <p className="asset-author">@{author}</p>
        </div>

        <div className="asset-formats-category">
          <div className="asset-formats">
            {formats.map((format, index) => (
              <span key={index} className="format-badge">{format}</span>
            ))}
          </div>
          <span className="asset-category">{category}</span>
        </div>
      </div>

    </div>
  );
};

export default AssetCard;
