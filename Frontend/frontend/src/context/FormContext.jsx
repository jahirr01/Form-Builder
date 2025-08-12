import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

const FormContext = createContext();

export function useFormContext() {
  return useContext(FormContext);
}

export function FormProvider({ children }) {
  const [form, setForm] = useState({
    title: "Untitled form",
    headerImage: "",
    questions: [],
  });

  function addQuestion(type = "categorize") {
    const q = {
      id: Date.now().toString(),
      type,
      questionText: "",
      image: "",
      // type-specific fields:
      options: [],       // categorize items
      categories: [],    // categorize boxes
      blanks: [],        // cloze blanks
      paragraph: "",     // comprehension
      subQuestions: [],  // comprehension sub-questions
      collapsed: false,  // for toggling edit mode
    };
    setForm((s) => ({ ...s, questions: [...s.questions, q] }));
  }

  function updateQuestion(id, patch) {
    setForm((s) => ({
      ...s,
      questions: s.questions.map((q) =>
        q.id === id ? { ...q, ...patch } : q
      ),
    }));
  }

  function removeQuestion(id) {
    setForm((s) => ({
      ...s,
      questions: s.questions.filter((q) => q.id !== id),
    }));
  }

  async function saveForm() {
    try {
      const res = await api.post("/forms", form);
      return res.data;
    } catch (err) {
      console.error("Failed to save form:", err);
      throw err;
    }
  }

  const value = {
    form,
    setForm,
    addQuestion,
    updateQuestion,
    removeQuestion,
    saveForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
