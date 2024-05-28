import React, {useContext, useState, useEffect} from "react";
import { Alert, Modal, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from 'react-native-image-picker';
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

  useEffect( () => {
    async function loadAvatar(){
      try{
        let response = await storage().ref('users').child(user?.uid).getDownloadURL();
        setUrl(response);
      }catch(err){
        console.log("Erro ao carregar a foto")
      }
    }

    loadAvatar();

    return () => loadAvatar();
  }, [])

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

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    };

    launchImageLibrary(options, response => {
      if(response.didCancel){
        console.log("Operação cancelada");
      }else if(response.error){
        console.log("Ops, algo deu errado!")
      }else{
        uploadFileFirebase(response)
        .then( () => {
          uploadAvatarPosts();
        })

        console.log("URI da foto ", response.assets[0].uri);
        setUrl(response.assets[0].uri)
      }
    })      
  }

  const getFileLocalPath = (response) => {
    //extrair e retornar a url da foto
    return response.assets[0].uri;
  }

  const uploadFileFirebase = async (response) => {
    const fileSource = getFileLocalPath(response);
    
    const storageRef = storage().ref('users').child(user?.uid);
    
    return await storageRef.putFile(fileSource)
  }

  const uploadAvatarPosts = async () => {
    const storageRef = storage().ref('users').child(user?.uid);
    const url = await storageRef.getDownloadURL()
    .then( async (image) => {
      console.log("URL Recebida ", image)

      // Atualizar as imagens de todos os posts do user
      const postDocs = await firestore().collection('posts')
      .where('userId', '==', user.uid).get();
      
      // Percorrer todos os posts e atualizar a URL da imagem
      postDocs.forEach( async doc => {
        await firestore().collection('posts').doc(doc.id).update({
          avatarUrl: image
        })
      })
    })
    .catch( (error) => {
      console.log("Erro ao atualizar foto do post ", error)
    })
  }

  return(
    <Container>
      <Header/>

      { url ? (
        <UploadButton onPress={ () => uploadFile() }>
          <UploadText>+</UploadText>
          <Avatar
            source={{ uri: url }}
          />
        </UploadButton>
      ) : (
        <UploadButton onPress={ () => uploadFile() }>
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