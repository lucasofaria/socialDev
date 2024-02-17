import React, { createContext, useState } from "react";
import { Alert } from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [ user, setUser ] = useState(null);

  async function signUp(email, password, name){
    await auth().createUserWithEmailAndPassword(email, password)
    .then( async (value) => {
      let uid = value.user.uid;
      await firestore().collection('users')
      .doc(uid).set({
        nome: name,
        createdAt: new Date(),
      })
      .then(() => {
        let data = {
          uid: uid,
          nome: name,
          email: value.user.email
        }
        
        setUser(data);

      })
    })
    .catch((error) => {
      console.log(error);
      Alert.alert("Atenção", "Erro ao realizar cadastro" );
    })
  }

  return(
    <AuthContext.Provider value={{ signed: !!user, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;