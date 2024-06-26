import React, {useState, useCallback, useContext} from "react";
import { View, ActivityIndicator } from "react-native";
import { Container, ButtonPost, ListsPosts } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import PostsLists from "../../components/PostsLists";

export default function Home(){
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const [ loadingRefresh, setLoadingRefresh ] = useState(false);
  const [ emptyList, setEmptyList ] = useState(false);
  const [ lastItem, setLastItem ] = useState('');

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
            setLastItem(snapshot.docs[snapshot.docs.length - 1]);
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

  //Atualizando posts ao puxar para cima
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
      setLastItem(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    })

    setLoadingRefresh(false);
  }

  //Buscando mais posts ao chegar no final da lista
  async function getListPosts(){
    if(emptyList){
      //Se buscou toda lista retira o loading
      setLoading(false);
      return null;
    }

    if(loading) return;

    firestore().collection('posts')
    .orderBy('created', 'desc')
    .limit(5)
    .startAfter(lastItem)
    .get()
    .then( (snapshot) => {
      const postList = [];

      snapshot.docs.map( u => {
        postList.push({
          ...u.data(),
          id: u.id,
        })
      })
      
      setEmptyList(!!snapshot.empty);
      setLastItem(snapshot.docs[snapshot.docs.length - 1]);
      setPosts(oldPosts => [...oldPosts, ...postList]);
      setLoading(false);
    })
  }

  return(
    <Container>

      <Header/>

      { loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color={'#E52246'}/>
        </View>
      ) : (
        <ListsPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => (
            <PostsLists
              data={item}
              userId={user?.uid}
            />
          )}

          refreshing={loadingRefresh}
          onRefresh={ handleRefreshPosts }

          onEndReached={ () => getListPosts() }
          onEndReachedThreshold={0.2}
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