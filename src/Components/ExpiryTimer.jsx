import { useState, useEffect } from "react";

export default function ExpiryTimer({ expiryTime }) 
{
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => 
    {
      // const expiry = new Date(expiryTime);

      
      const now = new Date();

      const expiry= new Date(now.getTime() + 15 * 60 * 1000); // Convert minutes to milliseconds

      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${minutes}m ${seconds}s`);
    };

    updateTimer(); // Run immediately
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer); // Cleanup
  }, [expiryTime]);

  console.log("Expiry Time: ", expiryTime);
  console.log("Time Left: ", timeLeft);

  return (
    <div className="bg-gray-800 px-4 py-2 rounded-lg text-center">
      <span className="text-sm text-gray-300">Account Expiry</span>
      <p className="text-white text-lg font-semibold">{timeLeft}</p>
    </div>
  );
}
