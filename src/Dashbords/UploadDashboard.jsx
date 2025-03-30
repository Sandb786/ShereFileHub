import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Upload, Trash2, LogOut, Download, FileText, FileImage, FileVideo, FileAudio, File, FileArchive } from "lucide-react";

export default function UploadDashboard() {
  const [files, setFiles] = useState([]);
  
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col p-6">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <UploadSection handleFileUpload={handleFileUpload} />
        <FilesList files={files} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg">
      <Typography variant="h5" className="text-blue-400 font-bold">FileHub</Typography>
      <Button color="red" variant="outlined" className="flex items-center gap-2">
        <LogOut /> Logout
      </Button>
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

function FilesList({ files, handleDelete }) {
  return (
    <motion.div 
      className="w-full md:w-full bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5" className="text-blue-400 mb-4">Uploaded Files</Typography>
      {files.length === 0 ? (
        <Typography className="text-gray-400">No files uploaded yet.</Typography>
      ) : (
        <ul className="space-y-3">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                {getFileIcon(file.name)}
                <span className="truncate w-50">{file.name}</span>
              </div>
              <Button size="sm" color="red" variant="outlined" onClick={() => handleDelete(index)}>
                <Trash2 />
              </Button>
            </li>
          ))}
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
