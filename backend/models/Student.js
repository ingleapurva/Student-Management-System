const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1, 'Year must be at least 1'],
      max: [5, 'Year cannot exceed 5'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    enrollmentDate: {
      type: Date,
      required: [true, 'Enrollment date is required'],
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', studentSchema);