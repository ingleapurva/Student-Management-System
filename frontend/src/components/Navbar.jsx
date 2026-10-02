import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">Student Management System</div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Students
          </NavLink>
          <NavLink to="/students/add" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Add Student
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;