import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../../hooks/useAuth';
import navLogo from '../../assets/nav-logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, accountType, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  // Patient navigation
  const patientNav = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' },
    ...(isLoggedIn && accountType === 'patient' ? [
      { name: 'Chat', href: '/chat', current: location.pathname === '/chat' },
      { name: 'Booking', href: '/booking', current: location.pathname === '/booking' },
      { name: 'Profile', href: '/profile', current: location.pathname === '/profile' },
    ] : []),
  ];

  // Doctor navigation
  const doctorNav = [
    { name: 'Dashboard', href: '/doctor-dashboard', current: location.pathname === '/doctor-dashboard' },
    { name: 'Appointments', href: '/doctor-appointments', current: location.pathname === '/doctor-appointments' },
    { name: 'My Patients', href: '/doctor-patients', current: location.pathname === '/doctor-patients' },
  ];

  const navigation = isLoggedIn && accountType === 'doctor' ? doctorNav : patientNav;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
  <div className="flex justify-between items-center h-15">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={navLogo}
              alt="NeuralHealer logo"
              className="h-4 md:h-30 w-auto object-contain block shrink-0"
            />
            <span className="sr-only">NeuralHealer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.current
                    ? 'text-primary bg-primary/10'
                    : 'text-textSecondary hover:text-primary hover:bg-accent/20'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <span className="text-textSecondary text-sm">
                    Welcome, {user?.firstName || 'User'}
                  </span>
                  <span className="text-xs text-primary font-medium capitalize">
                    {accountType === 'doctor' ? 'Doctor' : 'Patient'}
                  </span>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-textSecondary hover:text-primary focus:outline-none focus:text-primary"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    item.current
                      ? 'text-primary bg-primary/10'
                      : 'text-textSecondary hover:text-primary hover:bg-accent/20'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-accent/30">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-textSecondary">
                      Welcome, {user?.firstName || 'User'}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-textPrimary hover:text-primary hover:bg-accent/20"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-textPrimary hover:text-primary hover:bg-accent/20"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
