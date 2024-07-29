import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';
import '../App.css'; // Ensure this path is correct

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ profilePhoto: '', name: '', role: 'user' });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDetails = localStorage.getItem('user');

    if (token) {
      try {
        const user = userDetails ? JSON.parse(userDetails) : null;
        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        }
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
  }, []);

  const handleLocationSelect = (location) => {
    console.log('Selected location:', location);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser({ profilePhoto: '', name: '' });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const businesses = [
    'Home Services',
    'Plumbing',
    'Electrician',
    'Auto Services',
    'More'
  ];

  return (
    <nav className="bg-green-500 p-4 rounded-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl">YourApp</Link>
        <div className="flex-1 hidden md:flex items-center justify-center">
          <SearchBar onLocationSelect={handleLocationSelect} />
        </div>
        <div className="flex space-x-4 items-center">
          {user.role === 'businessOwner' && (
            <Link to="/dashboard" className="text-white">Dashboard</Link>
          )}
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="text-white focus:outline-none">
              Book Your Business
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <ul className="py-1">
                  {businesses.map((business, index) => (
                    <li key={index}>
                      <Link
                        to={`/${business.replace(' ', '').toLowerCase()}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        {business}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/writereview" className="text-white">Write a review</Link>
            <Link to="/listyourbusiness" className="text-white">List Your Business</Link>
            {isLoggedIn ? (
              <>
                <img src="profile.png" alt="Profile" className="w-8 h-8 rounded-full" />
                <button onClick={handleSignOut} className="text-white bg-orange-500">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-white">Login</Link>
                <Link to="/signup" className="text-white">Sign Up</Link>
              </>
            )}
          </div>
          <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <SearchBar onLocationSelect={handleLocationSelect} />
          <div className="flex flex-col space-y-4 mt-2">
            <Link to="/review" className="text-white">Write a review</Link>
            <Link to="/listyourbusiness" className="text-white">List Your Business</Link>
            {isLoggedIn ? (
              <>
                <img src="profile.png" alt="Profile" className="w-8 h-8 rounded-full self-center" />
                <button onClick={handleSignOut} className="text-white">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-white">Login</Link>
                <Link to="/signup" className="text-white">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
