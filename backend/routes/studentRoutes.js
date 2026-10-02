const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
  getFilterOptions,
} = require('../controllers/studentController');

// Routes for /api/students
router.route('/').get(getStudents).post(createStudent);

// Dashboard stats - must come before /:id
router.route('/stats/dashboard').get(getDashboardStats);

// Filter options
router.route('/filters/options').get(getFilterOptions);

// Routes for /api/students/:id
router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent);

module.exports = router;