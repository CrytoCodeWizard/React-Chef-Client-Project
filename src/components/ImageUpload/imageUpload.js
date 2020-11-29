import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadProfileImage } from "../../store/users/userActions";
import "./imageUpload.css";

function ImageUpload({ imageModal, setImageModal }) {
  const dispatch = useDispatch();
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    dispatch(uploadProfileImage(previewSource));
  };

  return (
    <div className="Img-upload">
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setImageModal(!imageModal)}
        className="Img-modal-close"
      >
        x
      </div>
      <form onSubmit={handleSubmitFile} className="img-upload-form">
        {previewSource && <img src={previewSource} alt="chosen" style={{ height: "300px" }} />}
        <input
          className="img-upload-input"
          onChange={handleFileInputChange}
          value={fileInputState}
          type="file"
        ></input>

        <button className="btn">Upload</button>
      </form>
    </div>
  );
}

export default ImageUpload;
