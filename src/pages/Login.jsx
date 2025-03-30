import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { User, Lock, Home, ArrowLeft, Key } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ userId: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 min-h-screen flex flex-col items-center relative">
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="flex items-center gap-2 bg-gray-900 p-3 rounded-lg shadow-lg transition duration-300 border-2 border-gray-500 text-white">
          <ArrowLeft /> <Home />
        </Link>
      </div>

      <div className="flex flex-col items-center w-full max-w-lg mt-50 md:mt-30">
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-10 bg-gray-900 bg-opacity-90 backdrop-blur-lg shadow-xl rounded-2xl w-full">
            <Typography variant="h3" className="text-center text-blue-400 mb-6">
              Login for Download
            </Typography>
            <form className="space-y-6">
              <InputField icon={<User />} type="text" name="userId" placeholder="User ID" value={form.userId} onChange={handleChange} />
              <InputField icon={<Lock />} type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
              <div className="flex justify-between text-gray-400 text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <Link to="/d" className="text-blue-400 hover:underline">Forgot Password?</Link>
              </div>
              <Button fullWidth color="blue" className="mt-4 text-lg py-3">
                Login
              </Button>
            </form>
            <Typography className="text-center text-gray-400 mt-6">
              Don't have an account? <Link to="/register" className="text-blue-400">Sign Up</Link>
            </Typography>
          </Card>
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
        className="w-full bg-gray-800 text-white px-12 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
      />
    </div>
  );
}
