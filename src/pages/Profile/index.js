import React, {useContext, useState} from "react";
import { Alert, Modal, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import firestore from "@react-native-firebase/firestore";
import { 
  Container,
  Name,
  Email,
  Button, 
  TextButton,
  UploadButton,
  UploadText,
  Avatar,
  ModalContainer,
  ButtonBack,
  AreaText,
  Text,
  Input 
} from "./styles";

function Profile(){
  const { signOut, user, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user?.nome);
  const [url, setUrl] = useState(null);
  const [ open, setOpen ] = useState(false);

  async function handleSignOut(){
    await signOut();
  }

  async function updateProfile(){
    if(nome === ''){
      return;
    }

    await firestore().collection('users')
    .doc(user?.uid)
    .update({
      nome: nome,
    })

    let data = {
      uid: user.uid,
      nome: nome,
      email: user.email
    }

    setUser(data);
    storageUser(data);
    setOpen(false);
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

      <Button bg={'#0077b6'} onPress={ () => setOpen(true)}>
        <TextButton color={'#FFF'}>Atualizar perfil</TextButton>
      </Button>

      <Button bg={'#DDD'} onPress={handleSignOut}>
        <TextButton color={'#36393F'}>Sair</TextButton>
      </Button>

      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={ Platform.OS === 'android' ? '' : 'padding' }>
          <ButtonBack onPress={ () => setOpen(false)}>
            <Feather
              name="arrow-left"
              size={25}
              color="#121212"
            />
            <TextButton color={'#36393F'}>Voltar</TextButton>
          </ButtonBack>

          <AreaText>
            <Text>Nome</Text>
          </AreaText>
          <Input
            placeholder={user?.nome}
            value={nome}
            onChangeText={ (text) => setNome(text) }
          />

          <Button bg={'#0077b6'} onPress={updateProfile}>
            <TextButton color={'#FFF'}>Salvar</TextButton>
          </Button>

        </ModalContainer>
      </Modal>

    </Container>
  )
}

export default Profile;