import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import studentService from '../services/studentService';
import StudentTable from '../components/StudentTable';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });

  useEffect(() => {
    fetchFilterOptions();
    fetchStudents();
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

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await studentService.getAll({
        search,
        department,
        course,
        page: pagination.page,
        limit: pagination.limit,
      });
      if (response.success) {
        setStudents(response.data);
        setPagination(prev => ({
          ...prev,
          total: response.total,
          pages: response.pages,
        }));
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to load students');
      console.error('Students error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchStudents();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const response = await studentService.delete(id);
      if (response.success) {
        fetchStudents();
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert('Failed to delete student');
      console.error('Delete error:', err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
      fetchStudents();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Students</h1>
        <p className="page-subtitle">Manage all student records</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button className="btn btn-secondary btn-sm" onClick={fetchStudents}>
            Retry
          </button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">All Students</h2>
          <Link to="/students/add" className="btn btn-primary">
            + Add Student
          </Link>
        </div>

        <div className="filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, or student ID..."
              value={search}
              onChange={handleSearch}
            />
          </div>
          <select
            className="filter-select"
            value={department}
            onChange={(e) => { setDepartment(e.target.value); handleFilterChange(); }}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={course}
            onChange={(e) => { setCourse(e.target.value); handleFilterChange(); }}
          >
            <option value="">All Courses</option>
            {courses.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <StudentTable
          students={students}
          onView={(id) => window.location.href = `/students/${id}`}
          onEdit={(id) => window.location.href = `/students/${id}/edit`}
          onDelete={handleDelete}
          isLoading={isLoading}
          isEmpty={!isLoading && students.length === 0}
        />

        {pagination.pages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </button>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`btn btn-sm ${pagination.page === page ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
            >
              Next
            </button>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;