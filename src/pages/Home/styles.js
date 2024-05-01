import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: #36393F;
`;

export const ListPosts = styled.FlatList`
  flex: 1;
  background-color: #F1F1F1;
`;

export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 60px;
  height: 60px;
  background-color: #202225;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;