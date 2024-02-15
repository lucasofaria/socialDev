import React, {useState} from "react";
import {View, ActivityIndicator} from 'react-native';

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

function Routes(){
  const signed = false;
  const loading = false;

  if(loading){
    return(
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#353840' }}>
        <ActivityIndicator size='large' color='#E52246'/>
      </View>
    )
  }

  return(
    signed ? <AppRoutes/> : <AuthRoutes/>
  )
}

export default Routes;