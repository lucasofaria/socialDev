import React, {useState} from 'react';
import { 
  Container, 
  Name, 
  Header, 
  Avatar, 
  ContentView, 
  Content, 
  Action,
  LikeButton, 
  Like,
  TimePost 
} from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { formatDistance } from 'date-fns'; 
import { ptBR } from 'date-fns/locale';

export default function PostList({ data, userId }) {
  const [likePost, setLikePost] = useState(data.likes);

  function formatDatePost(){
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(
      new Date(),
      datePost,
      {
        locale: ptBR
      }
    )
  }

  return (
    <Container>
      <Header>
        {data.avatarUrl ? (
          <Avatar
            source={{ uri : data.avatarUrl }}
          />
        ) : (
          <Avatar
            source={require('../../assets/avatar.png')}
          />
        )}

        <Name numberOfLines={1}>
          {data?.autor}
        </Name>
      </Header>

      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>

      <Action>  
        <LikeButton >
          <MaterialCommunityIcons
            name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#E52246"
          />

          <Like>{likePost === 0 ? '' : likePost}</Like>
        </LikeButton> 
 
        <TimePost>
          {formatDatePost()}
        </TimePost> 
      </Action>
    </Container>
  );
}