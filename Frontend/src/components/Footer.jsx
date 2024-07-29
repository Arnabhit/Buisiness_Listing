import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-orange-400 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">YourApp</h2>
          <p className="text-sm mt-2">Connecting you with the best businesses in town.</p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <Link to="/" className="mx-2 text-white hover:text-gray-300">Home</Link>
          <Link to="/about" className="mx-2 text-white hover:text-gray-300">About Us</Link>
          <Link to="/contact" className="mx-2 text-white hover:text-gray-300">Contact</Link>
          <Link to="/listyourbusiness" className="mx-2 text-white hover:text-gray-300">List Your Business</Link>
          <Link to="/terms" className="mx-2 text-white hover:text-gray-300">Terms & Conditions</Link>
          <Link to="/privacy" className="mx-2 text-white hover:text-gray-300">Privacy Policy</Link>
        </div>
        <div className="flex justify-center md:justify-end space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className="mt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} YourApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
