import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const { user, setUser } = useState(null);

  return(
    <AuthContext.Provider value={{ signed: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;