import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import studentService from '../services/studentService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDepartments: 0,
    totalCourses: 0,
    recentStudents: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      const response = await studentService.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to load dashboard statistics');
      console.error('Dashboard error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of student management system</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button className="btn btn-secondary btn-sm" onClick={fetchDashboardStats}>
            Retry
          </button>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon students">👨‍🎓</div>
          <div className="stat-info">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon departments">🏢</div>
          <div className="stat-info">
            <h3>{stats.totalDepartments}</h3>
            <p>Total Departments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon courses">📚</div>
          <div className="stat-info">
            <h3>{stats.totalCourses}</h3>
            <p>Total Courses</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recently Added Students</h2>
          <Link to="/students" className="btn btn-secondary btn-sm">
            View All
          </Link>
        </div>
        {stats.recentStudents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No Students Yet</h3>
            <p>Start by adding your first student</p>
            <Link to="/students/add" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Add Student
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Enrolled</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentStudents.map(student => (
                  <tr key={student._id}>
                    <td>{student.studentId}</td>
                    <td>{student.fullName}</td>
                    <td>{student.course}</td>
                    <td>{student.department}</td>
                    <td>
                      <span className="badge badge-year">Year {student.year}</span>
                    </td>
                    <td>{formatDate(student.enrollmentDate)}</td>
                    <td>
                      <Link to={`/students/${student._id}`} className="btn btn-secondary btn-sm">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;