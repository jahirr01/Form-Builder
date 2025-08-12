import React from "react";
import { useFormContext } from "../context/FormContext";
import CategorizeEditor from "./questionTypes/CategorizeEditor";
import ClozeEditor from "./questionTypes/ClozeEditor";
import ComprehensionEditor from "./questionTypes/ComprehensionEditor";
import ImageUploader from "./ImageUploader";

export default function QuestionEditor() {
  const { form, updateQuestion, selectedQuestionIndex } = useFormContext();

  const current =
    selectedQuestionIndex !== null && form.questions[selectedQuestionIndex]
      ? form.questions[selectedQuestionIndex]
      : null;

  if (!current) {
    return <div className="text-gray-500">Add a question to start editing.</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Question Text</label>
        <input
          value={current.questionText || ""}
          onChange={(e) =>
            updateQuestion(current.id, { questionText: e.target.value })
          }
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Question Image (optional)
        </label>
        <ImageUploader
          onUpload={(url) => updateQuestion(current.id, { image: url })}
        />
        {current.image && (
          <img
            src={current.image}
            alt="q"
            className="mt-2 h-36 object-cover rounded"
          />
        )}
      </div>

      <div className="mb-4">
        {current.type === "categorize" && (
          <CategorizeEditor
            question={current}
            onChange={(patch) => updateQuestion(current.id, patch)}
          />
        )}
        {current.type === "cloze" && (
          <ClozeEditor
            question={current}
            onChange={(patch) => updateQuestion(current.id, patch)}
          />
        )}
        {current.type === "comprehension" && (
          <ComprehensionEditor
            question={current}
            onChange={(patch) => updateQuestion(current.id, patch)}
          />
        )}
      </div>
    </div>
  );
}
