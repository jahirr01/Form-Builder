import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    questionType: { type: String, required: true }, // text, multiple-choice, etc.
    options: [String]
});

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String }, // local path
    questions: [questionSchema],
    createdAt: { type: Date, default: Date.now }
});

const Form = mongoose.model("Form", formSchema);
export default Form;
