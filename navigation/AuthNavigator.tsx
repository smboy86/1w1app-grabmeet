import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { BoxPressable } from '../components/basic';
import { LoginScreen } from '../screens';
import JoinScreen from '../screens/JoinScreen';
import SearchPasswordScreen from '../screens/SearchPasswordScreen';
import { RootAuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootAuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#000',
        headerBackTitle: '',
      }}>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Join'
        component={JoinScreen}
        options={{ title: '회원가입' }}
      />
      <Stack.Screen
        name='SearchPasswrd'
        component={SearchPasswordScreen}
        options={{ title: '비밀번호 찾기' }}
      />
    </Stack.Navigator>
  );
}
