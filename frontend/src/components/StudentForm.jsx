import { useState, useEffect } from 'react';

// Default courses and departments for when database is empty
const DEFAULT_COURSES = [
  'Computer Science',
  'Information Technology',
  'Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Data Science',
  'Artificial Intelligence',
  'Cybersecurity',
  'Software Engineering'
];

const DEFAULT_DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business & Management',
  'Data Science & Analytics',
  'Artificial Intelligence',
  'Cybersecurity',
  'Software Engineering'
];

const StudentForm = ({ initialData, onSubmit, isLoading, departments = [], courses = [] }) => {
  // Merge database values with defaults, removing duplicates
  const allCourses = [...new Set([...DEFAULT_COURSES, ...courses])];
  const allDepartments = [...new Set([...DEFAULT_DEPARTMENTS, ...departments])];
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    course: '',
    department: '',
    year: '',
    address: '',
    enrollmentDate: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        studentId: initialData.studentId || '',
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        dateOfBirth: initialData.dateOfBirth ? initialData.dateOfBirth.split('T')[0] : '',
        gender: initialData.gender || '',
        course: initialData.course || '',
        department: initialData.department || '',
        year: initialData.year || '',
        address: initialData.address || '',
        enrollmentDate: initialData.enrollmentDate ? initialData.enrollmentDate.split('T')[0] : '',
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.year) newErrors.year = 'Year is required';
    else if (formData.year < 1 || formData.year > 5) newErrors.year = 'Year must be between 1 and 5';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.enrollmentDate) newErrors.enrollmentDate = 'Enrollment date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isEditing = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="studentId" className="form-label">Student ID *</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            className={`form-input ${errors.studentId ? 'error' : ''}`}
            value={formData.studentId}
            onChange={handleChange}
            disabled={isEditing}
            placeholder="ID"
          />
          {errors.studentId && <span className="form-error">{errors.studentId}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="enrollmentDate" className="form-label">Enrollment Date *</label>
          <input
            type="date"
            id="enrollmentDate"
            name="enrollmentDate"
            className={`form-input ${errors.enrollmentDate ? 'error' : ''}`}
            value={formData.enrollmentDate}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.enrollmentDate && <span className="form-error">{errors.enrollmentDate}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="fullName" className="form-label">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className={`form-input ${errors.fullName ? 'error' : ''}`}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Sonam Mukharji"
        />
        {errors.fullName && <span className="form-error">{errors.fullName}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="sonam@example.com"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 "
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dateOfBirth" className="form-label">Date of Birth *</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dateOfBirth && <span className="form-error">{errors.dateOfBirth}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="gender" className="form-label">Gender *</label>
          <select
            id="gender"
            name="gender"
            className={`form-input ${errors.gender ? 'error' : ''}`}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="form-error">{errors.gender}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="course" className="form-label">Course *</label>
          <select
            id="course"
            name="course"
            className={`form-input ${errors.course ? 'error' : ''}`}
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Select Course</option>
            {allCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          {errors.course && <span className="form-error">{errors.course}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="department" className="form-label">Department *</label>
          <select
            id="department"
            name="department"
            className={`form-input ${errors.department ? 'error' : ''}`}
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {allDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <span className="form-error">{errors.department}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="year" className="form-label">Year *</label>
          <select
            id="year"
            name="year"
            className={`form-input ${errors.year ? 'error' : ''}`}
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">5th Year</option>
          </select>
          {errors.year && <span className="form-error">{errors.year}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="address" className="form-label">Address *</label>
        <textarea
          id="address"
          name="address"
          className={`form-input ${errors.address ? 'error' : ''}`}
          value={formData.address}
          onChange={handleChange}
          rows={3}
          placeholder="Full address including city, state, and ZIP code"
        />
        {errors.address && <span className="form-error">{errors.address}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onSubmit(null, true)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : (isEditing ? 'Update Student' : 'Add Student')}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;