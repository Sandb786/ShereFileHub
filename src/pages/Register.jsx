import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { User, Lock, UserPlus, Upload, Share2, Home, ArrowLeft, UserCheck, IdCard, TimerIcon } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({ name: "", userId: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 min-h-screen flex flex-col items-center relative">
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="flex items-center gap-2  bg-gray-900 p-3 rounded-lg shadow-lg transition duration-300 border-2 border-gray-500 text-white">
          <ArrowLeft /> <Home />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 w-full max-w-6xl mt-30 px-4">
        {/* Form Section */}
        <motion.div 
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg rounded-xl">
            <Typography variant="h3" className="text-center text-blue-400 mb-6">
              Create an Account
            </Typography>
            <form className="space-y-5">
              <InputField icon={<User />} type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
              <InputField icon={<IdCard />} type="text" name="userId" placeholder="User ID" value={form.userId} onChange={handleChange} />
              <InputField icon={<Lock />} type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
              <Button fullWidth color="blue" className="mt-4 cursor-pointer">
                Register
              </Button>
            </form>
            <Typography className="text-center text-gray-400 mt-4">
              Already have an account? <Link to="/u" className="text-blue-400">Login</Link>
            </Typography>
          </Card>
        </motion.div>

        {/* Info Section */}
        <motion.div 
          className="w-full bg-gray-800 p-6 rounded-lg shadow-lg text-center md:max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Typography variant="h5" className="text-blue-400 mb-4">
            How FileHub Works?
          </Typography>
          <div className="flex flex-col space-y-6 ">
            <StepInfo icon={<UserPlus />} text="Sign up to create your temprory account." />
            <StepInfo icon={<TimerIcon />} text="Your account is valid only for '1 Hour'." />
            <StepInfo icon={<Upload />} text="Upload files securely with encryption." />
            <StepInfo icon={<Share2 />} text="Share the UserID & password and easy access." />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ icon, type, name, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400">{icon}</div>
      <input 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        required 
        className="w-full bg-gray-800 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function StepInfo({ icon, text }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-blue-500 p-5 rounded-full">{icon}</div>
      <Typography className="text-gray-300">{text}</Typography>
    </div>
  );
}
