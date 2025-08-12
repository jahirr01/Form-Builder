import React, { useState } from "react";
import { uploadImage } from "../services/api";

export default function ImageUploader({ onUpload }) {
  const [loading, setLoading] = useState(false);
  async function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setLoading(true);
    try {
      const { url } = await uploadImage(f);
      onUpload(url);
    } catch (err) {
      alert("Upload failed");
    } finally { setLoading(false); }
  }
  return (
    <div>
      <label className="inline-block bg-gray-100 py-2 px-3 rounded cursor-pointer text-sm">
        {loading ? "Uploading..." : "Upload Image"}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </label>
    </div>
  );
}
