import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
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
    setImageModal(!imageModal);
  };

  return (
    <div className="Img-upload">
      <Form className="img-upload-form">
        {previewSource && <img src={previewSource} alt="chosen" style={{ height: "300px" }} />}
        <Form.Group>
          <Form.File
            className="img-upload-input"
            onChange={handleFileInputChange}
            value={fileInputState}
            label="Upload a profile picture..."
          />
        </Form.Group>

        <Button onClick={handleSubmitFile} variant="success" className="btn">
          Upload
        </Button>
        <Button variant="primary" onClick={() => setImageModal(!imageModal)} className="btn ml-2">
          Close
        </Button>
      </Form>
    </div>
  );
}

export default ImageUpload;
