import { blogDB } from "../config/db.js";
import mongoose from "mongoose";

const subttileSectionSchema = new mongoose.Schema({
  beforeContent: { type: String, default: "" },
  name: { type: [String], default: [""] },
  benefits: { type: [String], default: [""] },
  afterContent: { type: String, default: "" },
});

const imagePositionSchema = new mongoose.Schema({
  section: String,
  schemeIndex: Number,
  benefitIndex: Number,
  imageKey: String,
});

const blogSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  date: { type: String, default: () => new Date().toLocaleDateString("en-GB") },
  likes: { type: Number, default: 0 },
  readTime: { type: Number, default: 5 },
  imageKey: String,
  blogTags: [String],
  points: [String],
  heading: String,
  subheading: String,
  subheading1: String,
  introduction: String,
  introduction1: String,
  detailImageKey: String,

  subtitle: String,
  subttileHead: [subttileSectionSchema],

  subtitle1: String,
  subttileHead1: [subttileSectionSchema],

  subtitle2: String,
  subttileHead2: [subttileSectionSchema],

  subtitle3: String,
  subttileHead3: [subttileSectionSchema],

  subtitle4: String,
  subttileHead4: [subttileSectionSchema],

  subtitle5: String,
  subttileHead5: [subttileSectionSchema],

  subtitle6: String,
  subttileHead6: [subttileSectionSchema],

  paragraph1: String,
  paragraph2: String,
  paragraph3: String,

  outcome: String,
  lesson: String,
  outcome1: String,
  lesson1: String,
  outcome2: String,
  lesson2: String,

  conclusion: String,
  conclusion1: String,
  conclusion2: String,

  imagePositions: [imagePositionSchema],
});

// const Blog = mongoose.model("Blog", blogSchema, "dynamic_blogs");
const Blog = blogDB.model("Blog", blogSchema, "dynamic_blogs");
export default Blog;
// export default blogDB.model('Blog', blogSchema);






// import mongoose from 'mongoose';

// const blogSchema = new mongoose.Schema({
//   id: Number,
//   title: String,
//   description: String,
//   date: { type: String, default: () => new Date().toLocaleDateString("en-GB") },
//   likes: { type: Number, default: 0 },
//   readTime: { type: Number, default: 5 },
//   imageKey: String,
//   blogTags: [String],
//   points: [String],
//   heading: String,
//   subheading: String,
//   subheading1: String,
//   introduction: String,
//   introduction1: String,
//   detailImageKey: String,
//   subtitle: String,
//   subttileHead: [
//     {
//       name: String,
//       benefits: [String]
//     }
//   ],
//   subtitle1: String,
//   subttileHead1: [
//     {
//       name: String,
//       benefits: [String]
//     }
//   ],
//   imagePositions: [
//   {
//     section: String,       // e.g. "subttileHead", "paragraph1", "conclusion"
//     schemeIndex: Number,   // for subttileHead arrays
//     benefitIndex: Number,  // for benefits array (optional)
//     imageKey: String       // key for the image in your imageSrc map
//   }
// ],
//   subheading2: String,
//   subheading3: String,
//   paragraph1: String,
//   subttileHead3: [
//     {
//       name: String,
//       benefits: [String]
//     }
//   ],
//   outcome: String,
//   lesson: String,
//   subtitle5: String,
//   paragraph2: String,
//   subttileHead4: [
//     {
//       name: String,
//       benefits: [String]
//     }
//   ],
//   outcome1: String,
//   lesson1: String,
//   subtitle6: String,
//   paragraph3: String,
//   subttileHead5: [
//     {
//       name: String,
//       benefits: [String]
//     }
//   ],
//   outcome2: String,
//   lesson2: String,
//   conclusion: String,
//   conclusion1: String,
//   conclusion2: String
// });

// const Blog = mongoose.model("Blog", blogSchema,"dynamic_blogs");

// export default Blog;



