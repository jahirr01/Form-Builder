import React from "react";
import { useFormContext } from "../context/FormContext";
import ImageUploader from "./ImageUploader";

export default function Header() {
  const { form, setForm } = useFormContext();

  const handleTitleChange = (e) => {
    setForm({ ...form, title: e.target.value });
  };

  const handleHeaderUpload = (url) => {
    setForm({ ...form, headerImage: url });
  };

  const handleRemoveHeader = () => {
    setForm({ ...form, headerImage: "" });
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">Form Title</label>
          <input
            type="text"
            value={form.title || ""}
            onChange={handleTitleChange}
            placeholder="Enter form title..."
            className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex items-center gap-2">
          <ImageUploader onUpload={handleHeaderUpload} />
          {form.headerImage && (
            <button
              onClick={handleRemoveHeader}
              className="px-3 py-2 border rounded text-sm text-red-600 hover:bg-red-50"
              title="Remove header image"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {form.headerImage && (
        <div className="mt-3">
          <div className="text-xs text-gray-500 mb-1">Header preview</div>
          <div className="w-full h-40 md:h-56 rounded overflow-hidden border">
            <img
              src={form.headerImage}
              alt="form header"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
