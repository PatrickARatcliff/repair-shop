// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { addUser, editUser, deleteUser, UserData } from "../services/userService";

// // TODO: define the type for user data
// interface User {
//   // TODO: Define the structure of user data
// }

// interface AuthContextType {
//   user: User | null;
//   signedIn: boolean;
//   errors: string[];
//   signIn: (userData: User) => void;
//   signUp: (userData: UserData) => Promise<null | void>;
//   signOut: () => void;
//   setErrors: (newErrors: string[]) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [signedIn, setSignedIn] = useState(false);
//   const [errors, setErrors] = useState<string[]>([]);

//   const signIn = (userData: User) => {
//     setUser(userData);
//     setSignedIn(true);
//   };

//   const signUp = async (userData: UserData) => {
//     const response = await addUser(userData);

//     if (response !== null) {
//       setErrors(response.error);
//     } else {
//       setUser(userData);
//     }
//   };

//   const signOut = () => {
//     setUser(null);
//     setSignedIn(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, signedIn, signIn, signOut, signUp, errors, setErrors }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
