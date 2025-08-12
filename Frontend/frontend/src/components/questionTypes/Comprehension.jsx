import React, { useState } from "react";

export default function Comprehension({ question, onAnswer }) {
  const [answers, setAnswers] = useState(() => (question.subQuestions || []).map(()=> ""));
  function handleChange(i, v) {
    const next = [...answers]; next[i] = v; setAnswers(next);
    onAnswer(next);
  }
  return (
    <div>
      <div className="mb-2 font-medium">{question.questionText}</div>
      {question.image && <img src={question.image} className="mb-2 w-full h-40 object-cover rounded" alt="" />}
      <div className="prose mb-4">{question.paragraph}</div>
      <div className="space-y-3">
        {(question.subQuestions||[]).map((sq, i)=>(
          <div key={i}>
            <div className="font-medium text-sm">{sq}</div>
            <input value={answers[i]} onChange={(e)=>handleChange(i,e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
