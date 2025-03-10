import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Recruitment from './pages/Recruitment';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Hackathon from './pages/Hackathon';
import HackathonRegister from './pages/HackathonRegister';
import HackathonLogin from './pages/HackathonLogin';
import HackathonProblems from './pages/HackathonProblems';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedEditorRoute from './components/ProtectedEditorRoute';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white">
        <Navbar />
        <main className="pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/hackathon/register" element={<HackathonRegister />} />
            <Route path="/hackathon/login" element={<HackathonLogin />} />
            
            {/* Protected Routes - Only accessible after login */}
            <Route path="/hackathon/problems" element={<HackathonProblems />} />
            
            {/* Protected Editor Routes - Only for admin */}
            <Route path="/hackathon/manage-registrations" element={
              <ProtectedEditorRoute>
                <HackathonRegister />
              </ProtectedEditorRoute>
            } />
            <Route path="/hackathon/admin" element={
              <ProtectedEditorRoute>
                <HackathonLogin />
              </ProtectedEditorRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;