import React, {useContext, useState} from "react";
import { 
  Container,
  Name,
  Email,
  Button, 
  TextButton,
  UploadButton,
  UploadText,
  Avatar 
} from "./styles";

import Header from "../../components/Header";

import { AuthContext } from "../../contexts/auth";

function Profile(){
  const { signOut, user } = useContext(AuthContext);

  const [name, setName] = useState(user?.nome);
  const [url, setUrl] = useState(null);

  async function handleSignOut(){
    await signOut();
  }

  return(
    <Container>
      <Header/>

      { url ? (
        <UploadButton>
          <UploadText>+</UploadText>
          <Avatar
            source={{ uri: url }}
          />
        </UploadButton>
      ) : (
        <UploadButton>
          <UploadText>+</UploadText>
        </UploadButton>
      )}

      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Button bg={'#0077b6'}>
        <TextButton color={'#FFF'}>Atualizar perfil</TextButton>
      </Button>

      <Button bg={'#DDD'} onPress={handleSignOut}>
        <TextButton color={'#36393F'}>Sair</TextButton>
      </Button>

    </Container>
  )
}

export default Profile;