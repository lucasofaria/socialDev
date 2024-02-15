import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #353840;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #FFF;
  margin-bottom: 30px;
  font-style: italic;
`;

export const Input = styled.TextInput`
  background-color: #EEEEEE;
  border-radius: 6px;
  width: 80%;
  height: 45px;
  margin-bottom: 10px;
  padding: 10px;
  color: #121212;
  font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
  height: 45px;
  width: 80%;
  background-color: #428CFD;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: #FFF;
  font-weight: bold;
`;

export const AreaText = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const SignUp = styled.Text`
  font-size: 14px;
  color: #EEE;
`;