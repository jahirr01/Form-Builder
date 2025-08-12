import React from "react";
import { useFormContext } from "../context/FormContext";

export default function QuestionList() {
  const { form, setSelectedQuestionIndex, removeQuestion } = useFormContext();

  return (
    <div>
      <h4 className="text-sm font-semibold mb-2">Questions</h4>
      <div className="space-y-2">
        {form.questions.length === 0 && (
          <div className="text-sm text-gray-500">No questions yet</div>
        )}
        {form.questions.map((q, i) => (
          <div
            key={q.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div>
              <div className="text-sm font-medium">
                {q.questionText || `(${q.type}) Untitled`}
              </div>
              <div className="text-xs text-gray-500">Type: {q.type}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedQuestionIndex(i)}
                className="px-2 py-1 text-sm border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => removeQuestion(q.id)}
                className="px-2 py-1 text-sm text-red-600 border rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
