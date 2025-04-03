import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Download, LogOut, FileText, FileImage, FileVideo, FileMusic, File, FileAudio, FileArchive, Info, User } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import ExpiryTimer from "../Components/ExpiryTimer";

export default function DownloadDashboard() 
{
  const { userId } = useParams();
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(false); // ✅ Added refresh trigger


  useEffect(() => {
    
    const fetchFiles = async () => {
      try 
      {
        const response = await axios.get(`https://filehubshering.onrender.com/getallfile`, {
          params: { userid: userId },
        });
        console.log("FILES: ", response.data);
        setFiles(response.data);
      } 
      catch (error) 
      {
        console.error("Error fetching files:", error);
        if (error.response?.status === 404) 
        {
          setFiles([]); // Clear files if not found
        }
      }
    };

    const findUser = async () => 
      {
      try {
        const response = await axios.get(`https://filehubshering.onrender.com/getuser`, {
          params: { userid: userId },
        });
        console.log("USER: ", response.data);
        setUser(response.data);
        setPassword(response.data.password); // Set password from user data
      } 
      catch (error) 
      {
        console.error("Error fetching user:", error.response?.data);
        if (error.response?.status === 404) 
        {
          toast.error("User not found!", { position: "top-center", autoClose: 2000, style: { backgroundColor: "#1e293b", color: "#fff" }, });
          navigate('/');
        } 
      }
    };

    fetchFiles();
    findUser();
    const interval = setInterval(fetchFiles, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`https://filehubshering.onrender.com/download`, {
        params: { userid: userId, filename: filename },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success(`Downloading ${filename}`, { position: "top-center" });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file!", { position: "top-center" });
    }
  };

  return (
    <div className=" bg-gray-900 min-h-screen text-white flex flex-col p-6">
      <Navbar navigate={navigate} />



   
      {/* User Info Section */}
      <UserInfo user={user} userId={userId} />
      
      
      <motion.div 
        className="w-full max-w-4xl bg-gray-800 p-6 mt-4 rounded-lg shadow-lg mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="lead" className="text-blue-400 mb-4 text-left font-semibold">
          Download Files
        </Typography>
        {files.length > 0 ? (
          <ul className="space-y-3">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.filename)}
                  <span className="truncate w-50">{file.filename}</span>
                </div>
                <Button
                  size="sm"
                  color="blue"
                  variant="filled"
                  onClick={() => handleDownload(file.filename)}
                  className="flex items-center gap-2 transition-transform transform active:scale-80"
                >
                  <Download />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <Typography className="text-gray-400 text-center">No files available.</Typography>
        )}
      </motion.div>



      <ToastContainer />
    </div>
  );
}

/* 🟢 User Info Component */
function UserInfo({ user, userId }) {
  return (

    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg w-full gap-4 sm:gap-0">
            {/* Left: User Info */}
            <div className="flex items-center gap-3">
              <User size={45} className="text-blue-400 bg-gray-600 p-1 rounded" />
              <div>
                <h1 className="text-lg font-semibold text-white">Welcome, {user.username}!</h1>
                <span className="text-gray-400 text-sm">User ID: {userId}</span>
              </div>
            </div>
    
            {/* Right: Account Expiry */}
            <div className="bg-gray-700 px-4 py-2 rounded-lg text-center w-full sm:w-auto">
              {/* <span className="text-sm text-gray-300 block">Account Expiry</span> */}
              <ExpiryTimer expiryTime={user.expiryTime} />
              
            </div>
          </div>
  );
}



/* 🛑 Navbar Component */
function Navbar({ navigate }) 
{
  return (
    <nav className="w-full flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg">
      <Typography variant="h5" className="text-blue-400 font-bold">FileHub</Typography>
      <Button color="red" variant="outlined" onClick={() => navigate("/")} className="flex items-center gap-2">
        <LogOut /> Logout
      </Button>
    </nav>
  );
}



/* 📂 File Icon Function */
function getFileIcon(fileName) {
  const extension = fileName.split(".").pop().toLowerCase();

  const fileIcons = {
    pdf: <FileText className="text-red-400" size={24} />,
    doc: <FileText className="text-blue-400" size={24} />,
    docx: <FileText className="text-blue-400" size={24} />,
    txt: <FileText className="text-gray-400" size={24} />,
    jpg: <FileImage className="text-yellow-400" size={24} />,
    png: <FileImage className="text-yellow-400" size={24} />,
    mp4: <FileVideo className="text-purple-400" size={24} />,
    mp3: <FileAudio className="text-green-400" size={24} />,
    zip: <FileArchive className="text-orange-400" size={24} />,
  };

  return fileIcons[extension] || <File className="text-gray-400" size={24} />;
}
