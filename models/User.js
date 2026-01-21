
import mongoose from "mongoose";

 
const EducationSchema = new mongoose.Schema({
  degree: String,
  institute: String,
  yearFrom: String,
  yearTo: String,
});

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  years: String, 
});

const AccountSchema = new mongoose.Schema({
  platform: String, 
  url: String,
});

const SkillSchema = new mongoose.Schema({
  name: String,
  level: String,  
  percentage: Number  
});

const UserSchema = new mongoose.Schema(
  {
    name: String,
    firstName: String,
    lastName: String,    
    phone: String,
    email: { type: String, unique: true },
    password: String,
    image: String,
    provider: String,
    role: { type: String, default: "user" },

  
    about: String,

 
    resume: {
      data: { type: Buffer },        
      mimeType: String,   
      originalName: String, 
      uploadedAt: Date,
    },

    education: [EducationSchema],
    experience: [ExperienceSchema],
    // skills: [String],
    skills: [SkillSchema],
    accounts: [AccountSchema],
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
