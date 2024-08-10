// src/components/BusinessAnalytics.js

import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessAnalytics = () => {
  const [reviews, setReviews] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Mock fetch function to simulate API call
        // Replace with actual API endpoint and data
        const reviewsData = await new Promise((resolve) =>
          setTimeout(() => resolve([5, 10, 15, 20, 25]), 1000)
        );

        const likesData = await new Promise((resolve) =>
          setTimeout(() => resolve([20, 30, 40, 50, 60]), 1000)
        );

        setReviews(reviewsData);
        setLikes(likesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        toast.error('Error fetching analytics data');
      }
    };

    fetchAnalyticsData();
  }, []);

  const reviewsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Reviews',
        data: reviews,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const likesChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Likes',
        data: likes,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Business Analytics</h2>
      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Recent Reviews</h3>
            <Line data={reviewsChartData} />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Likes</h3>
            <Bar data={likesChartData} />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BusinessAnalytics;
