import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    imageUrl: '',
    latitude: '',
    longitude: '',
  });
  const [image,setImage]=useState();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast('Please log in first!');
      navigate('/signin'); // Redirect to the login page
    }
  }, [navigate]); // Only run this effect on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
  
    if (!token) {
      toast('Please log in first!');
      navigate('/login'); // Redirect to the login page
      return;
    }
  
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (image) {
      data.append('image', image); // Append the image file
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/business/business', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Add the Authorization header
        },
        body: data,
      });
  
      if (response.ok) {
        const result = await response.json();
        toast('Business added successfully!');
        console.log('Business added:', result);
        setIsSubmitted(true);
        navigate('/'); // Redirect to home page or another page after successful submission
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast.error('Error adding business');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast('Network error');
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Business</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              step="0.0001"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              step="0.0001"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded-md w-full">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BusinessForm;
