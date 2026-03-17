import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage';
import Testing from './pages/testing';
import RegisterPage from './pages/client/register';
import HomePage from './pages/homaPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResponsiveTesting from './pages/test';
import ForgetPassword from './pages/client/forgetPassword';
import ContactUs from './pages/client/contactUs';
import ReviewsPage from './pages/client/reviews';


function App() {
  return (
    <GoogleOAuthProvider clientId="724625136485-95v79o9ih3n8dlidviqd5hngvsvlsnfq.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right"/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/forgetPassword" element={<ForgetPassword/>} />
          <Route path="/r*" element={<ResponsiveTesting />} />
          <Route path="/*" element={<HomePage />} /> {/* ✅ always last */}
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/reviews/*" element={<ReviewsPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
