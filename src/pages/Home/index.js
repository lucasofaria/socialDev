import React, {useState, useCallback, useContext} from "react";
import { View, ActivityIndicator } from "react-native";
import { Container, ButtonPost, ListPosts } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import PostList from "../../components/PostList";

export default function Home(){
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const [ loadingRefresh, setLoadingRefresh ] = useState(false);
  const [ emptyList, setEmptyList ] = useState(false);
  const [ lastList, setLastList ] = useState('');

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      function fetchPosts(){
        firestore().collection('posts')
        .orderBy('created', 'desc')
        .limit(5)
        .get()
        .then((snapshot) => {

          if(isActive){
            setPosts([]);
            const postList = [];

            snapshot.docs.map( u => {
              postList.push({
                ...u.data(),
                id: u.id,
              })
            })

            setEmptyList(!!snapshot.empty);
            setPosts(postList);
            setLastList(snapshot.docs[snapshot.docs.length - 1]);
            setLoading(false);

          }
        })
      }

      fetchPosts();

    return () => {
      isActive = false;
    }

    }, [])
  )

  async function handleRefreshPosts(){
    setLoadingRefresh(true);

    firestore().collection('posts')
    .orderBy('created', 'desc')
    .limit(5)
    .get()
    .then((snapshot) => {

      setPosts([]);
      const postList = [];

      snapshot.docs.map( u => {
        postList.push({
          ...u.data(),
          id: u.id,
        })
      })

      setEmptyList(false);
      setPosts(postList);
      setLastList(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    })

    setLoadingRefresh(false);
  }

  return(
    <Container>

      <Header/>

      { loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color={'#E52246'}/>
        </View>
      ) : (
        <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => (
            <PostList
              data={item}
              userId={user?.uid}
            />
          )}

          refreshing={loadingRefresh}
          onRefresh={ handleRefreshPosts }
        />
      )}

      <ButtonPost 
        activeOpacity={0.7}
        onPress={() => navigation.navigate("NewPost")}
      >
        <Feather name="edit-2" color="#FFF" size={25}/>
      </ButtonPost>
    </Container>
  )
}