const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const cors = require("cors");


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Serve uploaded files

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Multer setup for local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save files in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Mongoose schema
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    imagePath: String // Store path to uploaded image
});

const Form = mongoose.model("Form", formSchema);

// API route to handle form submission
app.post("/submit", upload.single("image"), async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const newForm = new Form({
            name,
            email,
            message,
            imagePath
        });

        await newForm.save();
        res.status(201).json({ message: "Form submitted successfully", form: newForm });
    } catch (error) {
        console.error("Error saving form:", error);
        res.status(500).json({ error: "Failed to submit form" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
