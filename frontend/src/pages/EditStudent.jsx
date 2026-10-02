import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentService from '../services/studentService';
import StudentForm from '../components/StudentForm';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchStudent();
    fetchFilterOptions();
  }, [id]);

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

  const fetchStudent = async () => {
    try {
      setIsLoading(true);
      const response = await studentService.getById(id);
      if (response.success) {
        setStudent(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load student');
      console.error('Fetch student error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData, isCancel) => {
    if (isCancel) {
      navigate('/students');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await studentService.update(id, formData);
      if (response.success) {
        setSuccess('Student updated successfully!');
        setStudent(response.data);
        setTimeout(() => navigate('/students'), 1500);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student');
      console.error('Update student error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">❌</div>
        <h3>Student Not Found</h3>
        <p>{error || 'The requested student does not exist'}</p>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/students')}>
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Edit Student</h1>
        <p className="page-subtitle">Update student information for {student.fullName}</p>
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
          initialData={student}
          onSubmit={handleSubmit}
          isLoading={saving}
          departments={departments}
          courses={courses}
        />
      </div>
    </div>
  );
};

export default EditStudent;