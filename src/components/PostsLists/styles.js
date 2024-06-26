import styled from "styled-components";

export const Container = styled.View`
  margin-top: 8px;
  margin: 8px 2%;
  background-color: #FFF;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(18, 18, 18, 0.2);
  padding: 11px;
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
`;

export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #353840;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const ContentView = styled.View`
`;

export const Content = styled.Text`
  color: #353840;
  margin: 5px 0;
`;

export const Action = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const LikeButton = styled.TouchableOpacity`
  width: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Like = styled.Text`
  margin-left: 3px;
  color: #E52246;
`;

export const TimePost = styled.Text`
  color: #121212;
`;


