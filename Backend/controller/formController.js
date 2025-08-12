import Form from "../models/Form.js";

// Create new form
export const createForm = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const form = new Form({
            title,
            image: imagePath,
            questions: questions ? JSON.parse(questions) : []
        });

        await form.save();
        res.status(201).json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all forms
export const getForms = async (req, res) => {
    try {
        const forms = await Form.find();
        res.json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single form
export const getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ message: "Form not found" });
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
