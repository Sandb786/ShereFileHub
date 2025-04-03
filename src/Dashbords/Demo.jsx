import { useParams } from "react-router-dom";

export default function Demo() 
{
  const { userId } = useParams(); // Get userId from URL

  return (
    <div>
      <h1>Welcome, {userId}!</h1>
      <p>This is your dashboard.</p>
    </div>
  );
}
