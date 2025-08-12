// src/components/questionTypes/CategorizeEditor.jsx
import React from "react";

export default function CategorizeEditor({ question, onChange }) {
  function updateField(field, value) {
    onChange({ ...question, [field]: value });
  }

  function updateArray(field, index, value) {
    const arr = [...(question[field] || [])];
    arr[index] = value;
    onChange({ ...question, [field]: arr });
  }

  function addToArray(field) {
    onChange({ ...question, [field]: [...(question[field] || []), ""] });
  }

  function removeFromArray(field, index) {
    const arr = [...(question[field] || [])];
    arr.splice(index, 1);
    onChange({ ...question, [field]: arr });
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        className="border rounded p-2 w-full"
        placeholder="Question text"
        value={question.questionText || ""}
        onChange={(e) => updateField("questionText", e.target.value)}
      />

      <div>
        <div className="font-semibold mb-1">Options (items to categorize)</div>
        {(question.options || []).map((opt, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              className="border rounded p-1 flex-1"
              value={opt}
              onChange={(e) => updateArray("options", i, e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white px-2 rounded"
              onClick={() => removeFromArray("options", i)}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={() => addToArray("options")}
        >
          + Add Option
        </button>
      </div>

      <div>
        <div className="font-semibold mb-1">Categories</div>
        {(question.categories || []).map((cat, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              className="border rounded p-1 flex-1"
              value={cat}
              onChange={(e) => updateArray("categories", i, e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white px-2 rounded"
              onClick={() => removeFromArray("categories", i)}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={() => addToArray("categories")}
        >
          + Add Category
        </button>
      </div>
    </div>
  );
}
