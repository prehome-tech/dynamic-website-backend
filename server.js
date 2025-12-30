/* eslint-env node */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// 1. IMPORT DATABASE CONNECTIONS FIRST
import { formsDB } from "./config/db.js"; 

// 2. IMPORT ROUTES
import blogRoutes from "./routes/blogRoutes.js";
import './cron-ping.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS CONFIGURATION ---
const allowedOrigins = [
  "https://demo.prehome.in",
  "https://dynamic-website-react.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- MODELS (Defined using formsDB) ---

const Lead = formsDB.model('Lead', new mongoose.Schema({
  name: String,
  contact: String,
  location: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
}, { collection: 'general_inquiries' }));

const Appointment = formsDB.model('Appointment', new mongoose.Schema({
  name: String,
  contact: String,
  date: String,
  time: String,
  createdAt: { type: Date, default: Date.now },
}, { collection: 'expert_session_bookings' }));

const BuyerWaitlistLead = formsDB.model('BuyerWaitlistLead', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  selectedLocation: String,
  otherLocation: String,
  selectedLayout: String,
  otherLayout: String,
  source: { type: String, default: 'Main Website' }, 
  createdAt: { type: Date, default: Date.now },
}, { collection: 'waitlist_leads', strict: false }));


// --- API ROUTES ---

// Health Check
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'OK', message: 'API Service is active' });
});

// Blog Routes (uses blogDB internally via its own models)
app.use("/api/blogs", blogRoutes); 

// Route: General Lead form
app.post('/api/submit-form', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving lead data' });
  }
});

// Route: Appointment form
app.post('/api/submit-appointment', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(200).json({ message: 'Appointment submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving appointment data' });
  }
});

// Route: Waitlist form
app.post('/api/submit-waitlist', async (req, res) => {
  try {
    const newWaitlist = new BuyerWaitlistLead(req.body);
    await newWaitlist.save();
    res.status(200).json({ message: 'Waitlist form submitted successfully' });
  } catch (error) {
    console.error("❌ Waitlist Error:", error);
    res.status(500).json({ error: 'Error saving waitlist data' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
});


// import './cron-ping.js';


// dotenv.config();
// const PORT = process.env.PORT || 5000;

// const app = express();

// // CORS configuration
// const allowedOrigins = [
//   "https://demo.prehome.in",
//   "https://dynamic-website-react.onrender.com",
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "http://localhost:4173",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) return callback(null, true);
//       return callback(new Error("Not allowed by CORS"));
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // MongoDB Connection
// const uri = process.env.MONGO_URI;
// mongoose.connect(uri, {
//   dbName: process.env.DB_NAME,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Routes 
// app.use("/api/blogs", blogRoutes); 


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });















// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import Blog from "./models/Blog.js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// // mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {
// mongoose.connect("mongodb+srv://prehome_website_user:1ywa7PfsUW3pPWvt@lead-tracking.jysawuj.mongodb.net/dynamic-website-blogs", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));


// const uri = "mongodb+srv://prehome_website_user:1ywa7PfsUW3pPWvt@lead-tracking.jysawuj.mongodb.net/?retryWrites=true&w=majority";


// mongoose.connect(uri, {
//   dbName: "dynamic-website-blogs",  
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // Get all blogs
// app.get("/api/blogs", async (req, res) => {
//   try {
//     const blogs = await Blog.find();
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get single blog by ID
// app.get("/api/blogs/:id", async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
