import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    window.location.href = `http://localhost:3002?token=${encodeURIComponent(token)}`;
    
    // Optional: If you want to navigate back if the redirect fails
    const timer = setTimeout(() => {
      navigate(-1); // Goes back to previous page
    }, 3000); // After 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

 
};

export default RedirectToAdmin;