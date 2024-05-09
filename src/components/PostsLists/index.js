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
import firestore from '@react-native-firebase/firestore'; 
import { useNavigation } from '@react-navigation/native';

import { formatDistance } from 'date-fns'; 
import { ptBR } from 'date-fns/locale';

export default function PostsLists({ data, userId }) {
  const navigation = useNavigation();
  const [likePost, setLikePost] = useState(data.likes);

  async function handleLikesPost(id, likes){
    const docId = `${userId}_${id}`;

    const doc = await firestore().collection('likes')
    .doc(docId).get();

    //Retirando o like
    if(doc.exists){
      await firestore().collection('posts')
      .doc(id).update({
        likes: likes -1
      })

      await firestore().collection('likes').doc(docId)
      .delete()
      .then(() => {
        setLikePost(likes - 1)
      })

      return;
    }

    //Dando like
    await firestore().collection('likes')
    .doc(docId).set({
      postId: id,
      userId: userId
    })

    await firestore().collection('posts')
    .doc(id).update({
      likes: likes + 1
    })
    .then( () => {
      setLikePost(likes + 1)
    })

  }

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
      <Header onPress={ () => navigation.navigate("PostsUser", {title: data.autor, userId: data.userId} )}>
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
        <LikeButton onPress={ () => handleLikesPost(data.id, likePost)}>
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