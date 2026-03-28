import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { motion, noop } from "framer-motion";
import { Files, Loader2, LoaderPinwheel, LucideLoader, X } from "lucide-react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


export default function Lodder() {

  const [secondsLeft, setSecondsLeft] = useState(90);
  const [connectionStatus, setConnectionStatus] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setSecondsLeft(10)
          return 1;
        }
        return prev - 1;
      });
    }, 1100);

    return () => clearInterval(timer);

  }, [secondsLeft]);

  // 🌐 Try connecting every 45 seconds until successful or timeout
  useEffect(() => {

    const tryConnect = () => {
      axios.get('/')
        .then(() => {
          navigate('/index');
        })
        .catch(() => {
          setConnectionStatus(false);
        });
    };

    tryConnect(); // Initial attempt

    // Retry every 45 seconds
    const connectInterval = setInterval(() => {
      tryConnect();

    }, 50000);

    return () => clearInterval(connectInterval);

  }, [navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 ">

      <div className="fixed inset-0 flex items-center justify-center z-50 p-2">

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-10 py-15 flex flex-col items-center gap-6"
        >

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Files size={42} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-white tracking-wide">
              FileHub
            </h1>
          </div>

          {/* Loader */}
          <motion.div
            animate={{ rotate: connectionStatus ? -360 : 0 }}
            transition={{
              repeat: connectionStatus ? Infinity : 0,
              duration: 1,
              ease: "linear",
            }}
          >
            <LoaderPinwheel className="w-14 h-14 text-blue-500" />
          </motion.div>

          {/* Status */}
          {connectionStatus ? (
            <p className="text-gray-300 text-sm tracking-wide">
              Connecting...{" "}
              <span className="text-blue-400 font-semibold">
                {secondsLeft}s
              </span>
            </p>
          ) : (
            <p className="text-red-500 font-medium">
              Something went wrong
            </p>
          )}


          {/* Note */}
          <p className="text-gray-500 text-md text-center mt-15">
            Free server may take up to{" "}
            <span className="text-blue-400 font-medium">90 seconds</span> to wake up.
          </p>

        </motion.div>

      </div>
    </div>
  )
}
