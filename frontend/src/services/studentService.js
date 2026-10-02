import axios from 'axios';

const API_BASE_URL = '/api/students';

const studentService = {
  // Get all students with optional filters
  getAll: async (params = {}) => {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  },

  // Get single student by ID
  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Create new student
  create: async (studentData) => {
    const response = await axios.post(API_BASE_URL, studentData);
    return response.data;
  },

  // Update student
  update: async (id, studentData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, studentData);
    return response.data;
  },

  // Delete student
  delete: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/stats/dashboard`);
    return response.data;
  },

  // Get filter options
  getFilterOptions: async () => {
    const response = await axios.get(`${API_BASE_URL}/filters/options`);
    return response.data;
  },
};

export default studentService;