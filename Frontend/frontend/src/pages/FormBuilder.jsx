import React, { useState } from "react";

export default function FormBuilder() {
  const [title, setTitle] = useState("Untitled form");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "text" }]);
  };

  const saveForm = () => {
    alert("Form saved!");
  };

  const saveAndProceed = () => {
    alert("Form saved & proceeding!");
  };

  return (
    <div className="space-y-6">
      {/* Form Details Card */}
      <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Form Details
        </h2>

        {/* Form Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Form Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Questions Card */}
      <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Questions</h2>
          <button
            onClick={addQuestion}
            className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-sm"
          >
            + Add Question
          </button>
        </div>

        {questions.length === 0 ? (
          <p className="text-gray-500">No questions yet. Add one to start editing.</p>
        ) : (
          <ul className="space-y-3">
            {questions.map((q, i) => (
              <li
                key={i}
                className="p-3 border border-gray-300 rounded-lg flex items-center gap-3 bg-gray-50"
              >
                <input
                  type="text"
                  placeholder="Question text"
                  value={q.text}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[i].text = e.target.value;
                    setQuestions(updated);
                  }}
                  className="flex-1 border-none bg-transparent focus:ring-0"
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={saveForm}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Save
        </button>
        <button
          onClick={saveAndProceed}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Save & Proceed
        </button>
      </div>
    </div>
  );
}
