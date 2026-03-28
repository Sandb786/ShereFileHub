import axios from "axios";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Demo() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await toast.promise(
          axios.get("http://localhost:8080/"),
          {
            pending: "Loading data...",
            success: "Data loaded successfully!",
            error: "Failed to load    data!",
          }
        );

        const data = await response.text(); // or response.json()
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const triger=()=>{
    toast.info("This is an info message!", {
      position: "top-center",
      style: { backgroundColor: "#1e293b", color: "#fff" },
    });

    console.log("Toast triggered");
  }
  return (
    <div className="flex flex-auto justify-center items-center h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <p style={{color:'#000'}}>This is your dashboard.</p>
      <button onClick={triger} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Show Toast</button>

      <ToastContainer />
    </div>
  );
}