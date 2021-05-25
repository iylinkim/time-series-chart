import React from "react";

const DownloadBtn = ({ handleDownload }) => {
  return (
    <button className="download_btn" onClick={handleDownload}>
      <i className="fas fa-download"></i>
      <span className="download_text"> Download</span>
    </button>
  );
};

export default DownloadBtn;
