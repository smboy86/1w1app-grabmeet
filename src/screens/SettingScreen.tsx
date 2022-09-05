import { Button, Heading, Text } from 'native-base';
import { Alert } from 'react-native';
import { useRecoilState } from 'recoil';

import { Box } from '../components/basic';
import authAtomState from '../recoil/auth/authAtomState';

export default function SettingScreen() {
  const [authAtom, setAuthAtom] = useRecoilState(authAtomState);

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
            setAuthAtom({
              ...authAtom,
              isLogin: false,
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Box full>
      <Box ph={16} pt={12}>
        <Box pt={8}>
          <Button onPress={logout}>로그아웃</Button>
        </Box>
      </Box>
    </Box>
  );
}
