import React from 'react';
import { Container, Title } from './styles';
import { Text } from 'react-native';

export default function Header() {
  return (
    <Container>
      <Title>
        Dev
        <Text style={{color: '#E52246', fontStyle: 'italic'}}>Connect</Text>
      </Title>
    </Container>
  );
}