import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom";

import { Files, User, Code, Database, Globe, Github, Linkedin, CircleArrowLeft, ArrowLeft, } from "lucide-react";
import { useEffect } from "react";

export default function AboutUs() 
{
    const navigate = useNavigate();

    // Scroll to top on component mount
    useEffect(() => {
  window.scrollTo(0, 0);
}, []);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-12">

             <ArrowLeft size={28} className="text-blue-500 absolute " onClick={()=>navigate("/index")}/>

            <div className="max-w-5xl mx-auto space-y-12">


                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex justify-center items-center gap-2">
                        <Files className="text-blue-500" size={40} />
                        <h1 className="text-4xl font-bold">ShearHub</h1>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Simple. Fast. Secure File Sharing Platform.
                    </p>
                </motion.div>

                {/* About Project */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4"
                >
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Globe className="text-blue-500" /> About the Project
                    </h2>

                    <p className="text-gray-300 leading-relaxed">
                        <span className="text-blue-500 font-bold">ShearHub</span> is a modern file-sharing web application that allows users
                        to upload, manage, and download files easily. It is designed with a
                        clean UI and focuses on simplicity and performance.
                    </p>

                    <p className="text-gray-400">
                        Users can upload files, set optional passwords, and share them with
                        others. The platform provides a smooth experience with responsive
                        design and real-time interactions.
                    </p>
                </motion.div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6">
                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4"
                    >
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <Code className="text-blue-500" /> Features
                        </h2>

                        <ul className="text-gray-300 space-y-2 list-disc pl-5">
                            <li>Upload and download files easily</li>
                            <li>Password-protected file sharing</li>
                            <li>Responsive modern UI</li>
                            <li>Fast performance with optimized backend</li>
                            <li>Clean and simple user experience</li>
                        </ul>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4"
                    >
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <Database className="text-blue-500" /> Tech Stack
                        </h2>

                        <ul className="text-gray-300 space-y-2 list-disc pl-5">
                            <li>Frontend: React (Vite), Tailwind CSS</li>
                            <li>Backend: Spring Boot (Java)</li>
                            <li>Database: MongoDB Atlas</li>
                            <li>Animations: Framer Motion</li>
                            <li>API Communication: Axios</li>
                        </ul>
                    </motion.div>
                </div>


                {/* /* 👤 About Me Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4"
                >
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <User className="text-blue-500" /> About Me
                    </h2>

                    <p className="text-gray-300">
                        Hi, I’m <span className="text-blue-400 font-semibold">Sandeep</span>,
                        a final-year IT student and aspiring full-stack developer. I enjoy
                        building real-world applications using modern technologies and
                        continuously improving my skills.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-4 pt-3">

                        <a
                            href="https://github.com/Sandb786"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                        >
                            <Github size={18} />
                            GitHub
                        </a>

                        <a
                            href="https://linkedin.com/in/sandeep-mahawat-222b17312"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
                        >
                            <Linkedin size={18} />
                            LinkedIn
                        </a>

                    </div>
                </motion.div>
                {/* Footer */}
                <div className="text-center text-gray-500 text-sm pt-6">
                    © {new Date().getFullYear()} ShearHub. Built with passion by Sandeep.
                </div>

            </div>
        </div>
    );
}