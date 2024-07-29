import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Header from './components/Header';
import Navbar from './components/Navbar';
import ListYourBusiness from './pages/ListYourBusiness';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import SearchBar from './components/Searchbar';
import WriteReview from './pages/WriteReview';


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
       
      
      {/* <Routes>
        <Route index element={<HomePage />} />
        <Route path="/business" element={<BusinessPage />} />
      </Routes> */}
       </Routes>
    </Router>
  );
}

export default App;