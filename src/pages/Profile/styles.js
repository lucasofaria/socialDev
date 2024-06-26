import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #36393F;
`;

export const Name = styled.Text`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #FFF;
`;

export const Email = styled.Text`
  color: #FFF;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 18px;
  font-style: italic;
`;

export const Button = styled.TouchableOpacity`
  height: 45px;
  width: 90%;
  border-radius: 6px;
  margin-top: 16px;
  background-color: ${props => props.bg};
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-size: 17px;
  color: ${props => props.color};
`;

export const UploadButton = styled.TouchableOpacity`
  margin-top: 20%;
  background-color: #FFF;
  width: 165px;
  height: 165px;
  border-radius: 90px;
  justify-content: center;
  align-items: center;
  z-index: 8;
`;

export const UploadText = styled.Text`
  font-size: 55px;
  position: absolute;
  color: #E52246;
  opacity: 0.5;
  z-index: 99;
`;

export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
  width: 100%;
  height: 65%;
  background-color: #FFF;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

export const ButtonBack = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  left: 15px;
  top: 20px;
  align-items: center;
`;

export const AreaText = styled.View`
  width: 90%;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #121212;
`;

export const Input = styled.TextInput`
  background-color: #DDD;
  width: 90%;
  border-radius: 6px;
  padding: 10px;
  font-size: 18px;
`;