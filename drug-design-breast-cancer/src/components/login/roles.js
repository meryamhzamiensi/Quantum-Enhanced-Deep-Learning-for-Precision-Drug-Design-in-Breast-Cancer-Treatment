import React from 'react';
import { useNavigate } from 'react-router-dom';

const Roles = () => {
  const navigate = useNavigate();

  const handleCardClick = (role) => {
    switch(role) {
      case 'admin':
        navigate('/login/admin');
        break;
      case 'chimiste':
        navigate('/login/chimiste');
        break;
      case 'pharma':
        navigate('/login/pharma');
        break;
      default:
        navigate('/');
        break;
    }
  };

  // Inline styles for the cards
  const cardStyles = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px 0',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const cardStyle = {
    cursor: 'pointer',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  };

  const cardHover = {
    transform: 'scale(1.05)',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Choose your Role</h2>
      <div style={cardStyles}>
        <div 
          style={{ ...cardStyle, backgroundColor: '#ff69b4' }} 
          onClick={() => handleCardClick('admin')}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        >
          <h3>Admin</h3>
          <p>Manage users, resources, and data</p>
        </div>

        <div 
          style={{ ...cardStyle, backgroundColor: '#ffb6c1' }} 
          onClick={() => handleCardClick('chimiste')}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        >
          <h3>Chimiste</h3>
          <p>Submit molecular structures and get predictions</p>
        </div>

        <div 
          style={{ ...cardStyle, backgroundColor: '#f76c8e' }} 
          onClick={() => handleCardClick('pharma')}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        >
          <h3>Pharma</h3>
          <p>Optimize molecules for clinical trials</p>
        </div>
      </div>
    </div>
  );
};

export default Roles;
