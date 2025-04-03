import { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Typography } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, LogOut, FileText, FileImage, FileVideo, FileAudio, File, FileArchive, Cloud, CloudUpload, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpiryTimer from "../Components/ExpiryTimer";

export default function UploadDashboard() {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState("");
  const [fileMetadata, setFileMetadata] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false); // ✅ Added refresh trigger
    const navigate = useNavigate();
  

  // ✅ Fetch file metadata whenever refreshTrigger changes
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`https://filehubshering.onrender.com/getallfile`, {
          params: { userid: userId },
        });
        setFileMetadata(response.data);
        toast.success("Files fetched successfully!", {
          position: "top-right",
          autoClose: 1000,
          style: { backgroundColor: "#1e293b", color: "#fff" },
        });
      } catch (error) {
        console.error("Error fetching files:", error.response?.status);

        if (error.response?.status === 404) {
          setFileMetadata([]); // Set empty array if no files found
        }
        else {
          toast.error("Failed to fetch files!", { position: "top-center", autoClose: 2000, style: { backgroundColor: "#1e293b", color: "#fff" }, });
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
      } catch (error) {
        console.error("Error fetching user:", error.response?.status);
        if (error.response?.status === 404) {
          toast.error("User not found!", { position: "top-center", autoClose: 2000, style: { backgroundColor: "#1e293b", color: "#fff" }, });
          navigate('/');
        } else {
          toast.error("Failed to fetch user!", { position: "top-center", autoClose: 2000, style: { backgroundColor: "#1e293b", color: "#fff" }, });
        }
      }
    };

    fetchFiles();
    findUser(); // Fetch user data
  }, [userId, refreshTrigger]); // Runs when userId or refreshTrigger changes


  const handleFileUpload = async (event) => 
  {
    const uploadedFiles = Array.from(event.target.files);
  
    if (uploadedFiles.length === 0) return;
  
    for (let file of uploadedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userid", userId);
      formData.append("password", password);
  
      try {
        const response = await axios.post("https://filehubshering.onrender.com/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        toast.success(`File uploaded successfully!`, {
          position: "top-right",
          autoClose: 1000,
          style: { backgroundColor: "#1e293b", color: "#fff" },
        });

        setRefreshTrigger((prev) => !prev); // ✅ Trigger re-fetch after upload

        // ✅ Slightly increased delay for better multiple file handling
        await new Promise((resolve) => setTimeout(resolve, 500));
  
      }  catch (error) 
      {
        if (error.response.status === 403) 
        {
          toast.info(error.response?.data || "File upload failed!", { position: "top-center", autoClose: 2000, style: { backgroundColor: "#1e293b", color: "#fff" }, });
        }
        else 
        {
          toast.error(error.response?.data || "File upload failed!", { position: "top-center", autoClose: 2000, style: { backgroundColor: "#1e293b", color: "#fff" }, });
        }
      }
    }
  
    // ✅ Manually fetch files after uploading instead of using state
    await fetchFiles();
  };
  

  const handleDelete = async (fileName) => 
  {
    try {
      const response = await axios.delete(`https://filehubshering.onrender.com/deletefile`, {
        params: { userid: userId, filename: fileName },
      });
      setRefreshTrigger((prev) => !prev); // ✅ Re-fetch files after delete
    } catch (error) {
      toast.error(error.response?.data || "Failed to delete file!", { position: "top-center", autoClose: 2000, style: { backgroundColor: "#1e293b", color: "#fff" }, });
    }
  };


  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col p-6">

      <Navbar />

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



      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <UploadSection handleFileUpload={handleFileUpload} />

        {/* Pass fileMetadata and handleDelete to FilesList */}
        <FilesList fileMetadata={fileMetadata} handleDelete={handleDelete} />
      </div>

      <ToastContainer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg">
      <Typography variant="h5" className="text-blue-400 font-bold">FileHub</Typography>
      <Link to={'/'} >
        <Button color="blue" variant="filled" className="flex items-center cursor-pointer gap-2 transition-transform transform active:scale-90">
          <LogOut /> Logout
        </Button>
      </Link>
    </nav>
  );
}

function UploadSection({ handleFileUpload }) {
  return (
    <motion.div
      className="w-full md:w-5xl bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" className="text-blue-400 mb-4">
        Upload Files
      </Typography>
      <label className="border-2 border-dashed border-blue-400 p-6 w-full h-32 flex flex-col items-center justify-center cursor-pointer rounded-lg hover:bg-gray-700">
        <Upload className="text-blue-400" size={52} />
        <input type="file" multiple onChange={handleFileUpload} className="hidden" />
      </label>
    </motion.div>
  );
}


// ✅ Files List Component
function FilesList({ fileMetadata, handleDelete }) {
  return (
    <motion.div
      className="w-full md:w-full bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5" className="text-blue-400 mb-4">Uploaded Files</Typography>
      {fileMetadata.length === 0 ? (
        <Typography className="text-gray-400">No files uploaded yet.</Typography>
      ) : (
        <ul className="space-y-5">
          <AnimatePresence>
            {fileMetadata.map((file, index) => (
              <motion.li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
                initial={{ opacity: 0, x: 50 }}  // Start off-screen
                animate={{ opacity: 1, x: 0 }}  // Animate in
                exit={{ opacity: 0, x: -50 }}   // Animate out on delete
                transition={{ duration: 0.3 }}
                layout  // Ensures smooth layout transition
              >
                <div className="flex items-center gap-2">
                  {getFileIcon(file.filename)}
                  <span className="truncate w-30 md:w-50">{file.filename}</span>
                  <span className="text-gray-400 text-sm hidden md:block">{new Date().toLocaleTimeString()}</span>
                </div>

                <span className="text-green-400"><CloudUpload size={30} /></span>

                {/* Delete Button with Animation */}
                <Button
                  className="bg-red-500 text-white rounded-1 p-2 transition-transform transform active:scale-80"
                  onClick={() => handleDelete(file.filename)}
                >
                  <Trash2 />
                </Button>

              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </motion.div>
  );

}

function getFileIcon(fileName) {
  const extension = fileName.split(".").pop().toLowerCase();

  const fileIcons = {
    pdf: <FileText className="text-red-400" size={24} />,
    doc: <FileText className="text-blue-400" size={24} />,
    docx: <FileText className="text-blue-400" size={24} />,
    txt: <FileText className="text-gray-400" size={24} />,
    jpg: <FileImage className="text-yellow-400" size={24} />,
    jpeg: <FileImage className="text-yellow-400" size={24} />,
    png: <FileImage className="text-yellow-400" size={24} />,
    gif: <FileImage className="text-yellow-400" size={24} />,
    mp4: <FileVideo className="text-purple-400" size={24} />,
    mkv: <FileVideo className="text-purple-400" size={24} />,
    mp3: <FileAudio className="text-green-400" size={24} />,
    wav: <FileAudio className="text-green-400" size={24} />,
    zip: <FileArchive className="text-orange-400" size={24} />,
    rar: <FileArchive className="text-orange-400" size={24} />,
  };

  return fileIcons[extension] || <File className="text-gray-400" size={24} />;
}
