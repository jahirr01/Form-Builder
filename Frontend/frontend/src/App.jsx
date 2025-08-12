import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import FormBuilder from "./pages/FormBuilder";
import FormPreview from "./pages/FormPreview";
import NotFound from "./pages/NotFound";
import FormSubmitSuccess from "./components/FormSubmitSuccess";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="font-bold text-2xl text-indigo-600 hover:text-indigo-700 transition"
          >
            FormForge
          </Link>
          <div className="space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
            >
              Builder
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/form/:id" element={<FormPreview />} />
          <Route path="/success" element={<FormSubmitSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
