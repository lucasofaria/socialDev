import React, { useState, useContext, useLayoutEffect } from "react";
import {View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Input, Button, ButtonText } from "./styles";
import { AuthContext } from '../../contexts/auth';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

function NewPost(){
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight:() => (
        <Button onPress={handlePost}>
          <ButtonText>Publicar</ButtonText>
        </Button>
      )
    })
  }, [navigation, post])

  async function handlePost(){
    if(post === ''){
      Alert.alert("Atenção", "Seu post possui conteúdo inválido. Tente novamente.");
      return;
    }

    let avatarUrl = null;

    try{
      let response = await storage().ref('users').child(user?.uid).getDownloadURL();
      avatarUrl = response;
    }catch(err){
      avatarUrl = null;
    }

    await firestore().collection('posts')
    .add({
      created: new Date(),
      content: post,
      autor: user?.nome,
      userID: user?.uid,
      likes: 0,
      avatarUrl,
    })
    .then(() => {
      setPost('')
    })
    .catch((error) => {
      Alert.alert("Atenção", "Erro ao criar post: ")
      console.log(error);
    })

    navigation.goBack();
  }

  return(
    <Container>
      <Input
        placeholder='O que está acontecendo?'
        placeholderTextColor={'#DDD'}
        value={post}
        onChangeText={ (texto) => setPost(texto) }
        autoCorrect={false}
        multiline={true}
        maxLenght={300}
      />
    </Container>
  )
}

export default NewPost;