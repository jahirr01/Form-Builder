import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Categorize from "../components/questionTypes/Categorize";
import Cloze from "../components/questionTypes/Cloze";
import Comprehension from "../components/questionTypes/Comprehension";

export default function FormPreview() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchForm();
  }, [id]);

  async function fetchForm() {
    try {
      const res = await api.get(`/forms/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error("Error fetching form:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      formId: id,
      answers: Object.entries(answers).map(([qid, ans]) => ({
        questionId: qid,
        answer: ans,
      })),
    };
    try {
      await api.post("/responses", payload);
      navigate("/success");
    } catch (err) {
      alert("Failed to submit responses");
    }
  }

  if (!form)
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-600">
        Loading form...
      </div>
    );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      {form.headerImage && (
        <img
          src={form.headerImage}
          alt="Form Header"
          className="w-full h-56 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{form.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {form.questions.map((q) => (
          <div
            key={q._id || q.id}
            className="p-4 border border-gray-300 rounded-lg bg-gray-50"
          >
            {q.type === "categorize" && (
              <Categorize
                question={q}
                onAnswer={(a) =>
                  setAnswers({ ...answers, [q._id || q.id]: a })
                }
              />
            )}
            {q.type === "cloze" && (
              <Cloze
                question={q}
                onAnswer={(a) =>
                  setAnswers({ ...answers, [q._id || q.id]: a })
                }
              />
            )}
            {q.type === "comprehension" && (
              <Comprehension
                question={q}
                onAnswer={(a) =>
                  setAnswers({ ...answers, [q._id || q.id]: a })
                }
              />
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition"
          >
            Submit Responses
          </button>
        </div>
      </form>
    </div>
  );
}
