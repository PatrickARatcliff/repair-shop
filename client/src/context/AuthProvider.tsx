import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import jwtDecode from "jwt-decode";
import User from "../interfaces/User";
import UserData from "../interfaces/UserData"
import { BASE_URL } from "../services/baseUrl"

interface AuthContextType {
  user: User | null;
  signedIn: boolean;
  errors: string[];
  login: (token: string) => void;
  signOut: () => void;
  setErrors: (newErrors: string[]) => void;
  setUserData: (userData: UserData | null) => void;
  userData: UserData | null;
}

const LOCAL_STORAGE_TOKEN_KEY = "RS_TOKEN";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
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

    const fetchUserData = async (username: string) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        console.log(userData);
        setUserData(userData);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
    }
  };

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
    fetchUserData(username);
    setUser(user);
    setSignedIn(true);
  };

  const signOut = () => {
    setUser(null);
    setUserData(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setSignedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, signedIn, login, signOut, errors, setErrors, setUserData, userData }}
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
