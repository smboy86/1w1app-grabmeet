import { Button, Heading, Text } from 'native-base';
import { Alert } from 'react-native';

import { Box } from '../components/basic';

export default function SettingScreen() {
  const logout = () => {
    Alert.alert(
      '',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            alert('로그아웃');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Box full>
      <Box ph={16} pt={12}>
        {/* <Heading size={'xl'}>App Info</Heading> */}
        <Box pt={8}>
          <Button onPress={logout}>로그아웃</Button>
        </Box>
      </Box>
    </Box>
  );
}
