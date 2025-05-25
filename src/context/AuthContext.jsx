import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Or your configured axios instance if you have one

const AuthContext = createContext();

function storedAuth() {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    return token && user && typeof user === 'object' && !Array.isArray(user)
      ? {token, user, isAuthenticated: true} : {token: null, user: null, isAuthenticated: false};
  } catch { return {token: null, user: null, isAuthenticated: false}; }
}
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(storedAuth);
  useEffect(() => {
    if (authState.token) axios.defaults.headers.common.Authorization = `Bearer ${authState.token}`;
    else delete axios.defaults.headers.common.Authorization;
  }, [authState.token]);

  const login = (userData) => { // userData should include token and user object
    if (!userData?.token || !userData.user) throw new Error('Invalid login response');
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    setAuthState({
      token: userData.token,
      user: userData.user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
