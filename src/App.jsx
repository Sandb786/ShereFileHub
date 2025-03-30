import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import Register from "./pages/Register";
import Login from "./pages/Login";
import DownloadDashboard from "./Dashbords/DownloadDashboard";
import UploadDashboard from "./Dashbords/UploadDashboard";


function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/u" element={<UploadDashboard/>} />
      <Route path="/d" element={<DownloadDashboard/>} />
      <Route path="/upload" element={<Register/>} />
      <Route path="/download" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  </Router>
  )
}

export default App
