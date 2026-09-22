import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  login: (passkey: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('k4oow_admin_auth');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.token) {
          setIsAuthenticated(true);
          setUsername(parsed.username || 'K4ooW Admin');
          setToken(parsed.token);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const login = async (passkey: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passkey })
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUsername(data.username || 'K4ooW Admin');
        setToken(data.token);
        localStorage.setItem('k4oow_admin_auth', JSON.stringify({
          token: data.token,
          username: data.username
        }));
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Authentication failed' };
      }
    } catch (err: any) {
      // Client-side fallback if offline
      if (passkey === 'k4oow2026' || passkey === 'k4oow' || passkey === 'admin') {
        setIsAuthenticated(true);
        setUsername('K4ooW Admin');
        setToken('local-dev-token');
        localStorage.setItem('k4oow_admin_auth', JSON.stringify({
          token: 'local-dev-token',
          username: 'K4ooW Admin'
        }));
        return { success: true };
      }
      return { success: false, error: 'Connection error during authentication' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
    try {
      localStorage.removeItem('k4oow_admin_auth');
    } catch {
      // ignore
    }
  };

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        token,
        isAdminModalOpen,
        openAdminModal,
        closeAdminModal,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
