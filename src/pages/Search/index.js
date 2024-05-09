import React, {useState} from "react";
import Feather from 'react-native-vector-icons/Feather';
import { Container, AreaInput, Input } from "./styles";

function Search(){
  const [ input, setInput ] = useState('');
  const [users, setUsers] = useState([]);

  return(
    <Container>
      <AreaInput>
        <Feather
          name="search"
          size={20}
          color={'#E52246'}
        />

        <Input
          placeholder="Digite o nome"
          value={input}
          onChangeText={ (text) => setInput(text) }
        />
      </AreaInput>
    </Container>
  )
}

export default Search;