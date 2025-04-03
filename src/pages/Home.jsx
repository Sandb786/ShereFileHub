import { Link } from "react-router-dom";
import { Navbar, Typography, Button, Card } from "@material-tailwind/react";
import { Upload, Download, ShieldCheck, Clock, Users, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900">
      <CustomNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowToUseSection />
      <FooterSection />
    </div>
  );
}

// ✅ Navbar Component (Material Tailwind)
function CustomNavbar() {
  return (
    <Navbar className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-md px-6 py-4 border-0 rounded-none">

      <div className="flex justify-between items-center w-full">

        {/* Logo */}
        <Typography variant="h3" className="text-blue-400">
          FileHub
        </Typography>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-white opacity-0 md:opacity-100">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About Us</Link>
        </div>

        {/* Login Button */}
        <Link to="/uploadlogin">
          <Button color="blue" className="px-4 py-2 transition-transform transform active:scale-90 cursor-pointer">
            Login
          </Button>
        </Link>
      </div>

    </Navbar>
  );
}

// ✅ Hero Section
function HeroSection() {
  return (
    <motion.section
      className="h-[90vh] flex flex-col -mt-1 items-center justify-center text-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Typography variant="h1" className="text-5xl font-extrabold mb-4 text-blue-400">
          Secure & Simple File Sharing
        </Typography>
        <Typography variant="lead" className="text-lg text-gray-300 mb-6">
          Upload and download files effortlessly with security.
        </Typography>
      </motion.div>

      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >

        <Link to="/register">
          <Button color="blue" ripple="light" className="px-6 py-3 cursor-pointer transition-transform transform active:scale-90">
            Upload File
          </Button>
        </Link>

        <Link to="/downloadlogin">
          <Button color="gray" ripple="light" className="px-6 py-3 cursor-pointer transition-transform transform active:scale-90 cuesor-pointer">
            Download File
          </Button>
        </Link>

      </motion.div>

    </motion.section>
  );
}

// ✅ Features Section (More Compact)
function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-16 px-6 text-center">
      <Typography variant="h2" className="text-3xl font-bold text-gray-800 mb-8">
        Why Choose <span className="text-blue-500">FileHub?</span>
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard icon={<ShieldCheck size={32} className="text-blue-500" />} title="Secure Sharing" desc="Your files are encrypted and auto-deleted after 6 hours." />
        <FeatureCard icon={<Clock size={32} className="text-blue-500" />} title="Temporary Storage" desc="No need for permanent accounts, just quick file sharing." />
        <FeatureCard icon={<Users size={32} className="text-blue-500" />} title="Easy Access" desc="Share files using a simple ID & password system." />
      </div>
    </section>
  );
}

// ✅ Feature Card (Minimal & Compact)
function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="p-5 shadow-md flex flex-col items-center border-t-4 border-blue-500 hover:shadow-lg transition">
      <div className="bg-blue-100 p-3 rounded-full mb-3">{icon}</div>
      <Typography variant="h5" className="text-xl font-semibold text-gray-800">
        {title}
      </Typography>
      <Typography className="text-gray-600 text-sm mt-1">{desc}</Typography>
    </Card>
  );
}

// ✅ How to Use It Section (New Layout with Step Numbers)
function HowToUseSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6">
      <Typography variant="h2" className="text-3xl font-bold text-gray-800 text-center mb-10">
        How to Use <span className="text-blue-500">FileHub?</span>
      </Typography>
      <div className="max-w-4xl mx-auto space-y-8">
        <HowToStep number="1" icon={<Upload size={32} className="text-blue-500" />} title="Upload Your File" desc="Click the Upload button, select your file, and get a unique file ID." />
        <HowToStep number="2" icon={<Info size={32} className="text-blue-500" />} title="Share File ID" desc="Copy the file ID and password, then share it with the receiver." />
        <HowToStep number="3" icon={<Download size={32} className="text-blue-500" />} title="Download with ID" desc="Enter the file ID & password on the Download page to access your file." />
      </div>
    </section>
  );
}

// ✅ How-To-Use Step Component (New Design with Step Numbers)
function HowToStep({ number, icon, title, desc }) {
  return (
    <div className="flex items-center space-x-6 bg-white p-5 shadow-md rounded-lg hover:bg-gray-100 transition">
      <div className="flex items-center justify-center bg-blue-500 text-white font-bold rounded-full w-12 h-12 text-xl">
        {number}
      </div>
      <div>
        <Typography variant="h5" className="text-xl font-semibold text-gray-800">{title}</Typography>
        <Typography className="text-gray-600">{desc}</Typography>
      </div>
    </div>
  );
}

// ✅ Footer
function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4">
      <Typography>&copy; 2025 FileHub. All rights reserved.</Typography>
    </footer>
  );
}
