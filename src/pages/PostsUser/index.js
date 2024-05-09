import React, { useState, useLayoutEffect, useCallback, useContext } from "react";
import {View, Text, ActivityIndicator } from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";

import { AuthContext } from "../../contexts/auth";

import firestore from '@react-native-firebase/firestore';

import PostList from "../../components/PostsLists";

import { Container, ListsPosts } from "./styles";

function PostUser(){
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ title, setTitle ] = useState(route.params?.title);

  useLayoutEffect( () => {
    navigation.setOptions({
      title: title === '' ? '' : title
    })
  }, [navigation, title])

  useFocusEffect(
    useCallback( () => {
      let isActive = true;

      firestore()
      .collection('posts')
      .where('userId', '==', route.params?.userId)
      .orderBy('created', 'desc')
      .get()
      .then((snapshot) => {
        const postList = [];

        snapshot.docs.map( u => {
          postList.push({
            ...u.data(),
            id: u.id
          })
        })

        if(isActive){
          setPosts(postList);
          setLoading(false);
        }
      })

      return () => {
        isActive = false;
      }

    }, [])  
  )

  return(
    <Container>
      { loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            size={50} color={'#E52246'}
          />
        </View>
      ):(
        
        <ListsPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={ ({item}) => <PostList data={item} userId={user.uid} />}
        />
      )}
    </Container>
  )
}

export default PostUser;