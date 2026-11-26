import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Signup";
import PharmacyLogin from "./Pages/PharmacyLogin";
import PharmacyRegister from "./Pages/PharmacySignup";
import Landing from "./Pages/landingPage";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pharmacy-login" element={<PharmacyLogin />} />
        <Route path="/pharmacy-register" element={<PharmacyRegister />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;