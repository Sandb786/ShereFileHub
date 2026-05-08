import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button, Typography } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, LogOut, FileText, FileImage, FileVideo, FileMusic, File, FileAudio, FileArchive, Info, User } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import ExpiryTimer from "../Components/ExpiryTimer";
import formatFileSize from "./FileSizeFormate";

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
        const response = await axios.get(`/getallfile`, {
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
        const response = await axios.get(`/getuser`, {
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
      const response = await toast.promise(
        axios.get(`/download`, {
        params: { userid: userId, filename: filename },
        responseType: "blob",
      }),
       {
        pending: "Lodding...",
        // success: "Files fetched successfully!",
      },
      { position: "top-center", autoClose: 2000, style: { backgroundColor: "#192a45", color: "#fff" }, }
    );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success(`Downloading ${filename}`, { position: "top-center", autoClose: 2000, style: { backgroundColor: "#192a45", color: "#fff" } });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file!", { position: "top-center", autoClose: 2000, style: { backgroundColor: "#192a45", color: "#fff" } });
    }
  };

  return (
    <div className=" bg-gray-900 min-h-screen text-white flex flex-col p-6">
      <Navbar navigate={navigate} />



   
      {/* User Info Section */}
      <UserInfo user={user} userId={userId} />
      
      
      <motion.div 
        className="w-full max-w-4xl bg-gray-950 p-6 mt-4 rounded-lg shadow-lg mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="lead" className="text-blue-400 mb-4 text-left font-semibold">
          Download Files
        </Typography>
        {files.length > 0 ? (
          <ul className="space-y-5">
            <AnimatePresence>
            {files.map((file, index) => (
              <motion.li  key={index}
                className="grid  bg-gray-800 p-3 rounded-lg"
                initial={{ opacity: 0, x: 50 }}  // Start off-screen
                animate={{ opacity: 1, x: 0 }}  // Animate in
                exit={{ opacity: 0, x: -50 }}   // Animate out on delete
                transition={{ duration: 0.3 }}
                layout  // Ensures smooth layout transition
                >

                <div className="flex items-center gap-2">
                  {getFileIcon(file.filename)}
                  <span className="truncate md:max-w-50 w-50">{file.filename}</span>
                  <span className="text-gray-400 text-sm hidden md:block">{new Date().toLocaleTimeString()}</span>
                </div>

 
                <div className=" flex justify-between mt-3">


                 {/* <span className="text-gray-400 font-bold ">{formatFileSize(file.fileSize)}</span> */}
                  <Typography className="text-blue-300 font-semibold ">{formatFileSize(file.fileSize)}</Typography>

                <Button
                  size="sm"
                  color="blue"
                  variant="filled"
                  onClick={() => handleDownload(file.filename)}
                  className="flex items-center gap-2 transition-transform transform active:scale-80"
                >
                  <Download />
                </Button>

                </div>



              </motion.li>
            ))}
            </AnimatePresence>
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

    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between bg-gray-950 p-4 rounded-lg shadow-lg w-full gap-4 sm:gap-0">
            {/* Left: User Info */}
            <div className="flex items-center gap-3">
              <User size={45} className="text-blue-400 bg-gray-800 p-1 rounded" />
              <div>
                <h1 className="text-lg font-semibold text-white">Welcome, {user.username}!</h1>
                <span className="text-gray-400 text-sm">User ID: {userId}</span>
              </div>
            </div>
    
            {/* Right: Account Expiry */}
            <div className="bg-gray-800 px-4 py-2 rounded-lg text-center w-full sm:w-auto">
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
       <nav className="w-full flex justify-between items-center bg-gray-950 p-4 rounded-lg shadow-lg">
      <Typography variant="h5" className="text-blue-400 font-bold">ShareHub</Typography>
      <Button color="blue" variant="fill" onClick={() => navigate("/index")} className="flex items-center gap-2">
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
