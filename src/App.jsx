import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DoctorProtectedRoute from './components/auth/DoctorProtectedRoute';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPatients from './pages/doctor/DoctorPatients';
import Chat from './pages/patient/Chat';
import Doctors from './pages/patient/Doctors';
import Profile from './pages/patient/Profile';

// Placeholder components for protected routes

function App() {
  return (
    <Router>
  <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking" 
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          {/* Doctor Routes */}
          <Route 
            path="/doctor-dashboard" 
            element={
              <DoctorProtectedRoute>
                <DoctorDashboard />
              </DoctorProtectedRoute>
            } 
          />
          <Route 
            path="/doctor-appointments" 
            element={
              <DoctorProtectedRoute>
                <DoctorAppointments />
              </DoctorProtectedRoute>
            } 
          />
          <Route 
            path="/doctor-patients" 
            element={
              <DoctorProtectedRoute>
                <DoctorPatients />
              </DoctorProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
