import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import studentService from '../services/studentService';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [id]);

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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) return;
    
    setDeleting(true);
    try {
      const response = await studentService.delete(id);
      if (response.success) {
        navigate('/students');
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert('Failed to delete student');
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
        <Link to="/students" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">{student.fullName}</h1>
          <p className="page-subtitle">Student ID: {student.studentId}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to={`/students/${id}/edit`} className="btn btn-primary">
            ✏ Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : '🗑 Delete'}
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-item">
          <div className="detail-label">Email</div>
          <div className="detail-value"><a href={`mailto:${student.email}`}>{student.email}</a></div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Phone</div>
          <div className="detail-value"><a href={`tel:${student.phone}`}>{student.phone}</a></div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Date of Birth</div>
          <div className="detail-value">{formatDate(student.dateOfBirth)}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Gender</div>
          <div className="detail-value"><span className="badge badge-gender">{student.gender}</span></div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Course</div>
          <div className="detail-value">{student.course}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Department</div>
          <div className="detail-value">{student.department}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Year</div>
          <div className="detail-value"><span className="badge badge-year">Year {student.year}</span></div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Enrollment Date</div>
          <div className="detail-value">{formatDate(student.enrollmentDate)}</div>
        </div>
        <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
          <div className="detail-label">Address</div>
          <div className="detail-value" style={{ whiteSpace: 'pre-line' }}>{student.address}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Created At</div>
          <div className="detail-value">{formatDate(student.createdAt)}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Last Updated</div>
          <div className="detail-value">{formatDate(student.updatedAt)}</div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/students" className="btn btn-secondary">
          ← Back to Students
        </Link>
      </div>
    </div>
  );
};

export default StudentDetails;