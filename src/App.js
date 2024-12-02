import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/register";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import Home from './components/home';
import Users from './components/user';
import Graph from './components/graph';
import Navbar from './components/Navbar';
import { auth } from "./components/firebase";
import CRMform from './components/crmform'
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Routes với Login và Register */}
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" />
              ) : (
                <div className="auth-wrapper">
                  <div className="auth-inner">
                    <Login />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/login"
            element={
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <Login />
                </div>
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <SignUp />
                </div>
              </div>
            }
          />

          {/* Các Routes với Navbar */}
          <Route
            path="*"
            element={
              <>
                <Navbar /> {/* Navbar hiển thị ở tất cả các route sau */}
                <div className="content">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user" element={<Users />} />
                    <Route path="/graph" element={<Graph />} />
                    <Route path="/form" element={<CRMform />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
