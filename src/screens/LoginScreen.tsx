import * as React from 'react';
import { Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Input, Text } from 'native-base';
import { useForm, Controller } from 'react-hook-form';

import { Box, BoxPressable } from '../components/basic';
import Layout from '../constants/Layout';
import Images from '../assets/Images';

type Inputs = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const insect = useSafeAreaInsets();
  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Box full>
      <LinearGradient
        colors={['#bca490', '#937665']}
        style={{
          flex: 1,
          paddingTop: insect.top,
          paddingHorizontal: 26,
        }}>
        <Box full center pb={'60%'}>
          <Box
            center
            style={{
              paddingVertical: Layout.window.width * 0.11,
            }}>
            <Image
              source={Images.imgFavicon}
              style={{
                width: 48,
                height: 48,
              }}
            />
          </Box>
          <Box wFull>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder={'이메일 주소'}
                  placeholderTextColor={'#d3d3d3'}
                  _focus={{
                    borderColor: '#fff',
                  }}
                  mb={3}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder={'비밀번호 입력'}
                  placeholderTextColor={'#d3d3d3'}
                  _focus={{
                    borderColor: '#fff',
                  }}
                  secureTextEntry={true}
                />
              )}
            />
          </Box>
          <Box wFull pt={20}>
            <Button onPress={handleSubmit(onSubmit)}>로그인</Button>
          </Box>
          <Box
            row
            center
            style={{
              marginTop: 16,
            }}>
            <BoxPressable
              aEnd
              onPress={() => null}
              style={{
                flex: 0.4,
                padding: 4,
              }}>
              <Text fontSize='xs' color={'#fff'}>
                비밀번호 찾기
              </Text>
            </BoxPressable>
            <Divider orientation='vertical' mx='3' height={3} />
            <BoxPressable
              onPress={() => null}
              style={{
                flex: 0.4,
                padding: 4,
              }}>
              <Text fontSize='xs' color={'#fff'}>
                회원가입
              </Text>
            </BoxPressable>
          </Box>
        </Box>
      </LinearGradient>
    </Box>
  );
}
