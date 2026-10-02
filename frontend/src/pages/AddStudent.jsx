import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await studentService.getFilterOptions();
      if (response.success) {
        setDepartments(response.data.departments);
        setCourses(response.data.courses);
      }
    } catch (err) {
      console.error('Failed to load filter options:', err);
    }
  };

  const handleSubmit = async (formData, isCancel) => {
    if (isCancel) {
      navigate('/students');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await studentService.create(formData);
      if (response.success) {
        setSuccess('Student added successfully!');
        setTimeout(() => navigate('/students'), 1500);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student');
      console.error('Add student error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Add New Student</h1>
        <p className="page-subtitle">Fill in the details below to create a new student record</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>{success}</span>
        </div>
      )}

      <div className="card">
        <StudentForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          departments={departments}
          courses={courses}
        />
      </div>
    </div>
  );
};

export default AddStudent;