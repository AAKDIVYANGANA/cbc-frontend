import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage';
import Testing from './pages/testing';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;