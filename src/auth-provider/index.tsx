import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../components/config/firebase_config";
import { useLazyQuery } from '@apollo/client';
import { CHECK_EMAIL } from '@/helpers/query';

interface AuthContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthListenerProps {
  children: ReactNode;
}

const AuthListener: React.FC<AuthListenerProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [checkEmail, { loading: checkingEmail }] = useLazyQuery(CHECK_EMAIL);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser);
        localStorage.setItem('accessToken', token);
        
        const email: any = firebaseUser.email;
        get_user_detalis(email)       
        // setUser({
        //   ...firebaseUser,
        //   email: email || '' 
        // });
      } else {
        localStorage.removeItem('accessToken');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const get_user_detalis = (param: any) =>{
    if(param){
      checkEmail({ variables: { email: param } }).then(res=>{
        setUser(res?.data?.mst_users?.[0])
      }).catch((error: any)=>{
        setUser(error)
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthListener;
