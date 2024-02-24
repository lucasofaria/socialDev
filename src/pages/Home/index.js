import React from "react";
import {View, Text} from "react-native";
import { Container, ButtonPost } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";

function Home(){
  const navigation = useNavigation();

  return(
    <Container>
      <Text>Página Home</Text>

      <ButtonPost 
        activeOpacity={0.7}
        onPress={() => navigation.navigate("NewPost")}
      >
        <Feather name="edit-2" color="#FFF" size={25}/>
      </ButtonPost>
    </Container>
  )
}

export default Home;