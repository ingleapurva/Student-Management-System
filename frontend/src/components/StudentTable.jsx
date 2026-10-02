const StudentTable = ({ students, onView, onEdit, onDelete, isLoading, isEmpty }) => {
  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (isEmpty || students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👨‍🎓</div>
        <h3>No Students Found</h3>
        <p>Get started by adding a new student</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Department</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.department}</td>
              <td>
                <span className="badge badge-year">Year {student.year}</span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onView(student._id)}
                    title="View Details"
                  >
                    👁 View
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onEdit(student._id)}
                    title="Edit"
                  >
                    ✏ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(student._id)}
                    title="Delete"
                  >
                    🗑 Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;