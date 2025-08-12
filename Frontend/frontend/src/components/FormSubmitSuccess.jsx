import React from "react";
import { Link } from "react-router-dom";

export default function FormSubmitSuccess(){
  return (
    <div className="text-center py-24">
      <h2 className="text-2xl font-bold text-green-600">Thank you — response saved</h2>
      <p className="mt-2 text-gray-600">Your answers are recorded.</p>
      <Link to="/" className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Back to Builder</Link>
    </div>
  );
}
