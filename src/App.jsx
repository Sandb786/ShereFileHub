import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import Register from "./pages/Register";
import Login from "./pages/LoginUpload";
import DownloadDashboard from "./Dashbords/DownloadDashboard";
import UploadDashboard from "./Dashbords/UploadDashboard";
import LoginUpload from "./pages/LoginUpload";
import LoginDownload from "./pages/LoginDownload";
import Demo from "./Dashbords/Demo";
import axios from "axios";
import Lodder from "./Lodder";
import AboutUs from "./pages/AboutUs";


function App() 
{
  axios.defaults.baseURL = "https://filehubshering.onrender.com"; // Set the base URL for all requests
  // axios.defaults.baseURL = "http://localhost:8080"; // Set the base URL for all requests
  
  
  
  return (
    <Router>
    <Routes>

      <Route path="/index" element={<Home/>} />
      <Route path="/" element={<Lodder/>} />
      <Route path="/aboutUs" element={<AboutUs/>} />

      <Route path="/register" element={<Register/>} />

      <Route path="/uploadlogin" element={<LoginUpload/>} />
      <Route path="/downloadlogin" element={<LoginDownload/>} />

        {/* Protected Dashboards (Require User ID in URL) */}
      <Route path="/demo/:userId" element={<Demo/>} />
      <Route path="/uploadfile/:userId" element={<UploadDashboard/>} />
      <Route path="/downloadfile/:userId" element={<DownloadDashboard/>} />




    </Routes>
  </Router>
  )
}

export default App
