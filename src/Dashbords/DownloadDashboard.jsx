import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Download, LogOut, FileText, FileImage, FileVideo, FileMusic, File } from "lucide-react";

export default function DownloadDashboard() {
  const [files, setFiles] = useState([
    { name: "documentdfhgerjhgfbkjughrfikwejhnrcfiuekhfnrrbiuergytnierfuyhtukyj.pdf", type: "pdf" },
    { name: "image.png", type: "image" },
    { name: "video.mp4", type: "video" },
    { name: "audio.mp3", type: "audio" },
    { name: "notes.txt", type: "text" },
  ]);

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
      case "text":
        return <FileText size={20} className="text-blue-400" />;
      case "image":
        return <FileImage size={20} className="text-green-400" />;
      case "video":
        return <FileVideo size={20} className="text-red-400" />;
      case "audio":
        return <FileMusic size={20} className="text-purple-400" />;
      default:
        return <File size={20} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col p-6">
      <Navbar />
      <motion.div 
        className="w-full max-w-3xl bg-gray-800 p-6 mt-6 rounded-lg shadow-lg mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="text-blue-400 mb-4 text-center">
          Download Files
        </Typography>
        <ul className="space-y-3">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                {getFileIcon(file.type)}
                <span className="truncate w-50">{file.name}</span>
              </div>
              <Button size="sm" color="blue" variant="outlined">
                <Download />
              </Button>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg">
      <Typography variant="h5" className="text-blue-400 font-bold">FileShareHub</Typography>
      <Button color="red" variant="outlined" className="flex items-center gap-2">
        <LogOut /> Logout
      </Button>
    </nav>
  );
}
