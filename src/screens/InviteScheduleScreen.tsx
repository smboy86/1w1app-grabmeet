import * as React from 'react';
import { Alert } from 'react-native';
import { Button, Divider, FormControl, Text } from 'native-base';

import { Box, BoxPressable } from '../components/basic';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

export default function InviteScheduleScreen() {
  const [email, setEmail] = React.useState('');
  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {
    console.log('sadfsdf :: ', route);
  }, []);
  return (
    <Box full space>
      <Box ph={16}>
        <FormControl mb='5'>
          <FormControl.Label>미팅룸 링크</FormControl.Label>
          <BoxPressable
            onPress={() => Alert.alert('', '복사 완료')}
            pd={4}
            pl={12}
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 8,
            }}>
            <Text>https://grap-meet.app/kn...</Text>
          </BoxPressable>
        </FormControl>
        <FormControl mb='5'>
          <FormControl.Label>일정 제목</FormControl.Label>
          <Text>미팅을 잡자</Text>
        </FormControl>
        <FormControl mb='5'>
          <FormControl.Label>일정 날짜</FormControl.Label>
          <Text>2022.04.06</Text>
        </FormControl>
        <FormControl mb='5'>
          <FormControl.Label>참석 인원</FormControl.Label>
          <Text>4명</Text>
        </FormControl>
        <Box pd={14}>
          <Divider bg={'light.600'} />
        </Box>
        <BoxPressable
          onPress={() => Alert.alert('', '복사 완료')}
          pd={4}
          pl={12}
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
          }}>
          <Text>https://grap-meet.app/kn...</Text>
        </BoxPressable>
        <Box pd={14}>
          <Divider bg={'light.600'} />
        </Box>
        <FormControl mb='5'>
          <FormControl.Label>미팅 패스워드</FormControl.Label>
          <BoxPressable
            onPress={() => Alert.alert('', '복사 완료')}
            center
            pd={4}
            pl={12}
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 8,
            }}>
            <Text>0816</Text>
          </BoxPressable>
        </FormControl>
      </Box>
      <Box ph={16} mb={42}>
        <Button onPress={() => navigation.dispatch(CommonActions.goBack())}>
          확인
        </Button>
      </Box>
    </Box>
  );
}
