import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import StudentDetails from './pages/StudentDetails';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;