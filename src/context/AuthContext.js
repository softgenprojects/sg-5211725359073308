import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating checking for user session
    const checkUserSession = async () => {
      try {
        // In a real app, you'd check for a token in localStorage or cookies
        const token = localStorage.getItem('token');
        if (token) {
          // Validate token with your backend
          const response = await fetch('/api/validateToken', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // If token is invalid, clear it
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const login = async (email, password) => {
    // Simulating login API call
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { user, token } = await response.json();
        localStorage.setItem('token', token);
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}