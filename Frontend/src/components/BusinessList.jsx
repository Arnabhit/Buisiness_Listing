import React from 'react';
import BusinessCard from './BusinessCard';

const BusinessList = ({ businesses }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {businesses.map(business => (
      <BusinessCard key={business.id} business={business} />
    ))}
  </div>
);

export default BusinessList;
