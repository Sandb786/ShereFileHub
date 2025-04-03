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


function App() 
{
  
  return (
    <Router>
    <Routes>

      <Route path="/" element={<Home/>} />

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
