import React, { createContext, useContext, useState, ReactNode } from "react";
import User from "../interfaces/User"

interface AuthContextType {
  user: User | null;
  signedIn: boolean;
  errors: string[];
  signIn: (userData: User) => void;
  signOut: () => void;
  setErrors: (newErrors: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    userId: 99,
    userName: "test@test.com"
  });
  const [signedIn, setSignedIn] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const signIn = (userData: User) => {
    setUser(userData);
    setSignedIn(true);
  };

  const signOut = () => {
    setUser({
      userId: 99,
      userName: "test@test.com"
    });
    setSignedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, signedIn, signIn, signOut, errors, setErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
