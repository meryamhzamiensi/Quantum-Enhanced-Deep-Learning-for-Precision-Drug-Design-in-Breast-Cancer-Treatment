// Dans AdminLogin.js
useEffect(() => {
  const token = new URLSearchParams(window.location.search).get('token');
  if (token) {
    localStorage.setItem('authToken', token);
  }
}, []);