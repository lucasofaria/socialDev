import React, {useContext} from "react";
import {View, Text, Button} from "react-native";

import { AuthContext } from "../../contexts/auth";

function Profile(){
  const { signOut } = useContext(AuthContext);

  async function handleSignOut(){
    await signOut();
  }

  return(
    <View>
      <Text>Página de Perfil</Text>
      <Button
        title="Sair"
        onPress={handleSignOut}
      />
    </View>
  )
}

export default Profile;