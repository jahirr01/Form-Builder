import React from "react";


export default function ClozeEditor({ question, onChange }) {
  function handleText(e) {
    onChange({ questionText: e.target.value });
  }

  return (
    <div>
      <div className="text-sm text-gray-600 mb-2">
        Use{" "}
        <code className="bg-gray-100 px-1 rounded">
          {"{{blank}}"}
        </code>{" "}
        where you want blanks.
      </div>
      <textarea
        value={question.questionText}
        onChange={handleText}
        className="w-full border rounded p-2"
        rows={4}
      />
    </div>
  );
}
