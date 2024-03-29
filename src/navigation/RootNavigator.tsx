import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import authAtomState from '../recoil/auth/authAtomState';
import exampleWithParens from '../recoil/auth/withParens';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default function RootNavigator() {
  // const [isLoading, setIsLoading] = useState(true);

  const [authAtom, setAuthAtom] = useRecoilState(authAtomState);
  console.log('RootNavigator authAtom :: ', authAtom);
  // const ttt = useRecoilValue(exampleWithParens);

  // useEffect(() => {
  //   console.log('Root useRecoilValue   ', ttt);
  //   const getLoginData = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem('@loginUserId');
  //       if (userId !== null) {
  //         // 강제 로그인
  //         setAuthAtom({
  //           isLogin: true,
  //           userId: userId,
  //         });
  //       }
  //     } catch (e) {
  //       // error reading value
  //     }

  //     setIsLoading(false);
  //   };

  //   getLoginData();
  // }, []);

  // if (isLoading) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      {!authAtom.isLogin ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
}
