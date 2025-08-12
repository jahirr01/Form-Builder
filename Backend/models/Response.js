import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    questionId: mongoose.Schema.Types.ObjectId,
    answer: mongoose.Schema.Types.Mixed
});

const responseSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
    answers: [answerSchema],
    submittedAt: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", responseSchema);
export default Response;
