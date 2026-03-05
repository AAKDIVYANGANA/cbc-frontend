import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage';
import Testing from './pages/testing';
import RegisterPage from './pages/client/register';
import HomePage from './pages/homaPage';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/admin/*" element={<AdminPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;