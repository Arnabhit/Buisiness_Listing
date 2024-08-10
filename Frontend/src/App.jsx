import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Header from './components/Header';
import Navbar from './components/Navbar';
import ListYourBusiness from './pages/ListYourBusiness';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import SearchBar from './components/Searchbar';
import WriteReview from './pages/WriteReview';
import Analytics from './pages/Analytics';
import BusinessList from './components/BusinessList';
import WriteReviewForm from './pages/WriteReviewForm';


function App() {
  return (
    <Router>
      <Routes>
       <Route index element={<Header />} />
       <Route path="/listyourbusiness" element={<ListYourBusiness />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/signin" element={<Signin/>} />
       <Route path="/bar" element={<SearchBar/>} />
       <Route path="/nav" element={<Navbar/>} />
       <Route path="/writereview" element={<WriteReview/>} />
       <Route path="/analytics" element={<Analytics/>} />
       <Route path="/BusinessList" element={<BusinessList/>} />
       <Route path="/business/:businessId/review" element={<WriteReviewForm />} />
      
      {/* <Routes>
        <Route index element={<HomePage />} />
        <Route path="/business" element={<BusinessPage />} />
      </Routes> */}
       </Routes>
    </Router>
  );
}

export default App;