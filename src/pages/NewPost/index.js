import React, { useState, useLayoutEffect } from "react";
import {View, Text} from "react-native";
import { Container, Input, Button, ButtonText } from "./styles";
import { useNavigation } from "@react-navigation/native";

function NewPost(){
  const navigation = useNavigation();
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight:() => (
        <Button>
          <ButtonText>Publicar</ButtonText>
        </Button>
      )
    })
  }, [navigation, post])

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