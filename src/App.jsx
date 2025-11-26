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

// Placeholder components for protected routes
const Chat = () => (
  <div className="min-h-screen bg-background p-8">
    <div className="container mx-auto">
  <h1 className="text-3xl font-bold text-textPrimary mb-6">AI Therapy Chat</h1>
  <div className="bg-white rounded-lg shadow-md p-6">
  <p className="text-textSecondary">Chat interface will be implemented here.</p>
  <p className="text-textSecondary mt-2">This is where you'll interact with the AI therapist using voice and text.</p>
      </div>
    </div>
  </div>
);

const Booking = () => (
  <div className="min-h-screen bg-background p-8">
    <div className="container mx-auto">
  <h1 className="text-3xl font-bold text-textPrimary mb-6">Book a Session</h1>
  <div className="bg-white rounded-lg shadow-md p-6">
  <p className="text-textSecondary">Professional booking system will be implemented here.</p>
  <p className="text-textSecondary mt-2">Browse and book sessions with licensed psychologists.</p>
      </div>
    </div>
  </div>
);

const Profile = () => (
  <div className="min-h-screen bg-background p-8">
    <div className="container mx-auto">
  <h1 className="text-3xl font-bold text-textPrimary mb-6">Your Profile</h1>
  <div className="bg-white rounded-lg shadow-md p-6">
  <p className="text-textSecondary">User dashboard and session history will be implemented here.</p>
  <p className="text-textSecondary mt-2">View your progress, past sessions, and self-help suggestions.</p>
      </div>
    </div>
  </div>
);

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
                <Booking />
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
