import React, { useState } from "react";

export default function ComprehensionEditor({ question, onChange }) {
  const [sq, setSq] = useState("");
  function addSubQuestion() {
    if (!sq) return;
    onChange({ subQuestions: [...(question.subQuestions||[]), sq] });
    setSq("");
  }
  function removeSub(i) {
    onChange({ subQuestions: question.subQuestions.filter((_,idx)=>idx!==i) });
  }
  return (
    <div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Paragraph</label>
        <textarea value={question.paragraph} onChange={(e)=>onChange({ paragraph: e.target.value })} className="w-full border rounded p-2" rows={6} />
      </div>

      <div>
        <div className="text-sm font-medium mb-2">Sub-questions</div>
        <div className="flex gap-2">
          <input value={sq} onChange={(e)=>setSq(e.target.value)} className="flex-1 border rounded px-2 py-1" />
          <button onClick={addSubQuestion} className="px-3 bg-indigo-600 text-white rounded">Add</button>
        </div>
        <div className="mt-2 space-y-1">
          {(question.subQuestions||[]).map((s,i)=>(
            <div className="flex items-center justify-between p-2 border rounded" key={i}>
              <div>{s}</div>
              <button onClick={()=>removeSub(i)} className="text-red-600">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
