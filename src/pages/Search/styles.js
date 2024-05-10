import styled from "styled-components";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 15px;
  background-color: #36393F;
`;

export const AreaInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #E1E1E1;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 6px;
`;

export const Input = styled.TextInput`
  width: 95%;
  padding-left: 10px;
  height: 40px;
  font-size: 14px;
  color: #000;
  background-color: #E1E1E1;
`;

export const List = styled.FlatList`
  flex: 1;
`;