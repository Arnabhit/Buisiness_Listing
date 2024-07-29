import React from 'react';
import { Link } from 'react-router-dom';

const BusinessCard = ({ business }) => (
  <div className="border p-4 rounded shadow-md">
    <h2 className="text-xl font-bold">{business.name}</h2>
    <p className="text-gray-600">{business.description}</p>
    <Link to={`/business/${business.id}`} className="text-blue-500 hover:underline">Learn More</Link>
  </div>
);

export default BusinessCard;
