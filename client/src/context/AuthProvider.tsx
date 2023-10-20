import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import jwtDecode from "jwt-decode";
import User from "../interfaces/User";

interface AuthContextType {
  user: User | null;
  signedIn: boolean;
  errors: string[];
  login: (token: string) => void;
  // signIn: (userData: User) => void;
  signOut: () => void;
  setErrors: (newErrors: string[]) => void;
}

const LOCAL_STORAGE_TOKEN_KEY = "repairShopToken";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  
    type DecodedToken = {
      sub: string;
      authorities: string;
    };
  
    const decodedToken: DecodedToken = jwtDecode(token);
  
    const { sub: username, authorities: authoritiesString } = decodedToken;
    
    const roles = authoritiesString.split(',');
    
    const user = {
      username: username,
      roles: roles,
      token: token,
      hasRole: (role: string) => {
        return roles.includes(role);
      }
    };
  
    setUser(user);
    setSignedIn(true);
  };

  // const signIn = (userData: User) => {
  //   setUser(userData);
  //   setSignedIn(true);
  // };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setSignedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, signedIn, login, signOut, errors, setErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
