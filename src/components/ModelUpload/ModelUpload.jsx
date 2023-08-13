import React, { useState } from "react";
import axios from "axios";
import "./ModelUpload.css";

const ModelUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modelFile, setModelFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      if (!title || !description || !modelFile) {
        console.error("Please fill in title, description, and upload a file");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("model", modelFile);

      await axios.post("http://127.0.0.1:4253/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);

      console.log("Model uploaded successfully");
    } catch (error) {
      setLoading(false);
      console.error("Error uploading model:", error);
    }
  };

  return (
    <div className="container">
      <h2>Upload a 3D Model</h2>
      <div className="input-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Upload Model File</label>
        <input type="file" onChange={(e) => setModelFile(e.target.files[0])} />
      </div>
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Model"}
      </button>
    </div>
  );
};

export default ModelUpload;
