import React, {useState} from "react";
import { Text, Alert } from "react-native";
import { Container, Title, Input, Button, TextButton, AreaText, SignUp } from "./styles";

function Login(){
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


  function toggleLogin(){
    setLogin(!login)
    setEmail('');
    setPassword('');
    setName('');
  }

  function handleSignIn(){
    if(email === '' || password === ''){
      Alert.alert('Atenção', 'Preencha todos os campos!')
    }
  }

  function handleSignUp(){
    if(name === '' || email === '' || password === ''){
      Alert.alert('Atenção', 'Preencha todos os campos para cadastrar!')
    }
  }
  
  if(login){
    return(
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
          <TextButton>Acessar</TextButton>
        </Button>
  
        <AreaText onPress={toggleLogin}>
          <SignUp>Criar uma conta</SignUp>
        </AreaText>
      </Container>
    )
  }
  return(
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
        placeholder="***************"
        secureTextEntry={true}
        onChangeText={(texto) => setPassword(texto)}
        value={password}
      />

      <Button onPress={handleSignUp}>
        <TextButton>Cadastrar</TextButton>
      </Button>

      <AreaText onPress={toggleLogin}>
        <SignUp>Já tenho uma conta</SignUp>
      </AreaText>
    </Container>
  )
}

export default Login;