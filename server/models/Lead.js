import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  orgSize: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  whatsNotWorking: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Avoid OverwriteModelError in server reloads
export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
