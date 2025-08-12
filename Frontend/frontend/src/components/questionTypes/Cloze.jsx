import React, { useState } from "react";

/*
question: { questionText: "The capital of France is __blank0__.", blanks: [{index:0}], ... }
We expect question.questionText to contain placeholders like {{0}} or use blanks array.
For simplicity: we'll treat blanks as array of placeholder positions and render inputs in order.
*/
export default function Cloze({ question, onAnswer }) {
  // parse by placeholder token like [[blank]]
  const parts = (question.questionText || "").split("{{blank}}");
  const [vals, setVals] = useState(() => Array(parts.length - 1).fill(""));
  function handleChange(i, v) {
    const next = [...vals]; next[i] = v; setVals(next);
    onAnswer(next);
  }
  return (
    <div>
      <div className="mb-2 font-medium">{/* show label */}</div>
      {question.image && <img src={question.image} alt="" className="mb-2 w-full h-40 object-cover rounded" />}
      <div className="text-lg">
        {parts.map((p, i) => (
          <span key={i}>
            <span>{p}</span>
            {i < parts.length - 1 && (
              <input value={vals[i]} onChange={(e)=>handleChange(i,e.target.value)}
                className="border-b-2 mx-2 w-40 inline-block py-1" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
