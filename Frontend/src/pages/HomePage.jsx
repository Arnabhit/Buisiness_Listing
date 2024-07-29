import React from 'react';
import BusinessList from '../components/BusinessList';

const businesses = [
  { id: 1, name: 'Business 1', description: 'This is business 1' },
  { id: 2, name: 'Business 2', description: 'This is business 2' },
  { id: 3, name: 'Business 3', description: 'This is business 3' }
];

const HomePage = () => (
  <div>
    <h2>Businesses</h2>
    <BusinessList businesses={businesses} />
  </div>
);

export default HomePage;
