import Response from "../models/Response.js";
import Form from "../models/Form.js";

// Submit response
export const submitResponse = async (req, res) => {
    try {
        const { formId, answers } = req.body;

        const form = await Form.findById(formId);
        if (!form) return res.status(404).json({ message: "Form not found" });

        const response = new Response({
            formId,
            answers
        });

        await response.save();
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get responses for a form
export const getResponsesByFormId = async (req, res) => {
    try {
        const responses = await Response.find({ formId: req.params.formId });
        res.json(responses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
