import * as React from 'react';
import { Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button, Divider, Input } from 'native-base';
import { useForm, Controller, UseFormHandleSubmit } from 'react-hook-form';

import { Box, BoxPressable, Text } from '../components/basic';
import Layout from '../constants/Layout';
import Images from '../assets/Images';
import { useRecoilState } from 'recoil';
import authAtomState from '../recoil/auth/authAtomState';
import { axiosInstance } from '../apis/apiClient';

// type Inputs = {
//   email: string;
//   password: string;
// };

export default function LoginScreen() {
  const [authAtom, setAuthAtom] = useRecoilState(authAtomState);

  const insect = useSafeAreaInsets();
  const navigation = useNavigation();

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: any) => {
    console.log(
      'onSubmit :: ',
      data,
      data.email.lenght < 1,
      data.password.lenght < 1
    );
    // TODO - 유효성검사
    if (data.email.length < 1) {
      Alert.alert('', '이메일을 입력하세요.');
      return;
    }

    if (data.password.length < 1) {
      Alert.alert('', '패스워드를 입력하세요.');
      return;
    }
    // TODO - 로그인 처리
    console.log('11 get 시작');
    try {
      const getLogin = await axiosInstance.get('/api/users/2', {
        params: {
          nickname: data.email,
          lastnumber: data.password,
        },
      });

      console.log('222 :: ', JSON.stringify(getLogin));
    } catch (error) {
      console.log('머지 ~~~ eeerrr   :: ', error);
    }

    // setAuthAtom({
    //   ...authAtom,
    //   isLogin: true,
    // });
  };

  return (
    <Box full>
      <LinearGradient
        colors={['#fff', '#fff']}
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
            <Box pt={4}>
              <Text size={20}>미팅을 잡자</Text>
            </Box>
          </Box>
          <Box wFull>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder={'이메일을 입력해주세요'}
                  placeholderTextColor={'#d3d3d3'}
                  _focus={{
                    borderColor: '#fff',
                  }}
                  keyboardType={'email-address'}
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
                  placeholder={'숫자 4자리 입력 ex) HP 뒷자리 0816'}
                  placeholderTextColor={'#d3d3d3'}
                  _focus={{
                    borderColor: '#fff',
                  }}
                  keyboardType={'number-pad'}
                  secureTextEntry={true}
                />
              )}
            />
          </Box>
          <Box wFull pt={20}>
            <Button onPress={handleSubmit(onSubmit)}>시작하기</Button>
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
