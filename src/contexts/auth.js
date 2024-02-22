import React, { createContext, useState } from "react";
import { Alert } from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [ user, setUser ] = useState(null);
  const [ loadingAuth, setLoadingAuth ] = useState(false);

  async function signUp(email, password, name){
    setLoadingAuth(true);

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
        setLoadingAuth(false);

      })
    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
      Alert.alert("Atenção", "Erro ao realizar cadastro" );
    })
  }

  async function signIn(email, password){
    setLoadingAuth(true);
    
    await auth().signInWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid;

      const userProfile = await firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        email: value.user.email
      };

      setUser(data);
      setLoadingAuth(false);

    })
    .catch((error) => {
      console.log(error);
      setLoadingAuth(false);
      Alert.alert("Atenção", "Erro ao realizar login" );
    })
  }

  return(
    <AuthContext.Provider value={{ signed: !!user, signUp, signIn, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;