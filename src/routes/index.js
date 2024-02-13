import React from "react";
import {View, ActivityIndicator} from 'react-native';

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

function Routes(){
  const signed = true;
  const loading = false;

  if(loading){
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <ActivityIndicator size='large' color='#121212'/>
    </View>
  }

  return(
    signed ? <AppRoutes/> : <AuthRoutes/>
  )
}

export default Routes;