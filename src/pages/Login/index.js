import React, {useState, useContext} from "react";
import { Text, Alert, Keyboard, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Container, Title, Input, Button, TextButton, AreaText, SignUp } from "./styles";

import { AuthContext } from "../../contexts/auth";

function Login(){
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { signUp, signIn, loadingAuth } = useContext(AuthContext);


  function toggleLogin(){
    setLogin(!login)
    setEmail('');
    setPassword('');
    setName('');
  }

  async function handleSignIn(){
    if(email === '' || password === ''){
      Alert.alert('Atenção', 'Preencha todos os campos!')
    }

    Keyboard.dismiss();
    await signIn(email, password);

  }

  async function handleSignUp(){
    if(name === '' || email === '' || password === ''){
      Alert.alert('Atenção', 'Preencha todos os campos para cadastrar!')
    }

    Keyboard.dismiss();
    await signUp(email, password, name);

  }
  
  if(login){
    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Title>
            Dev<Text style={{ color: '#E52246' }}>Connect</Text>
          </Title>
    
          <Input
            placeholder="digite seu email"
            onChangeText={(texto) => setEmail(texto)}
            value={email}
          />
    
          <Input
            placeholder="digite sua senha"
            secureTextEntry={true}
            onChangeText={(texto) => setPassword(texto)}
            value={password}
          />
    
          <Button onPress={handleSignIn}>
            {loadingAuth ? (
              <ActivityIndicator size={20} color={'#FFF'}/>
            ) : (
              <TextButton>Acessar</TextButton>
            )}
          </Button>
    
          <AreaText onPress={toggleLogin}>
            <SignUp>Criar uma conta</SignUp>
          </AreaText>
        </Container>
      </TouchableWithoutFeedback>
    )
  }
  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Title>
          Dev<Text style={{ color: '#E52246' }}>Connect</Text>
        </Title>

        <Input
          placeholder="Digite seu nome"
          onChangeText={(texto) => setName(texto)}
          value={name}
        />

        <Input
          placeholder="Digite seu email"
          onChangeText={(texto) => setEmail(texto)}
          value={email}
        />

        <Input
          placeholder="**********"
          secureTextEntry={true}
          onChangeText={(texto) => setPassword(texto)}
          value={password}
        />

        <Button onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color={'#FFF'}/>
          ) : (
            <TextButton>Cadastrar</TextButton>
          )}
        </Button>

        <AreaText onPress={toggleLogin}>
          <SignUp>Já tenho uma conta</SignUp>
        </AreaText>
      </Container>
    </TouchableWithoutFeedback>  
  )
}

export default Login;