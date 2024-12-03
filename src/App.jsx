import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WalletButton from "./components/WalletButton";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import "./App.css"

const App = () => {
  const [themeParams, setThemeParams] = useState({});

  useEffect(() => {
    const telegram = window.Telegram?.WebApp; 

    if (telegram) {
      telegram.ready(); 
      setThemeParams(telegram.themeParams); 

      const onThemeChange = () => {
        setThemeParams(telegram.themeParams);
      };

      telegram.onEvent("themeChanged", onThemeChange);

      return () => {
        telegram.offEvent("themeChanged", onThemeChange);
      };
    } else {
      console.error("Telegram WebApp API not available");
    }
  }, []);

  const appStyle = {
    backgroundColor: themeParams.bg_color || "#ffffff",
    color: themeParams.text_color || "#000000",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <Router>
      <div style={appStyle}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        <WalletButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
