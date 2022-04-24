import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LOADING_TIME } from '../constants/Options';
import commonAtomState from '../recoil/common/commonAtomState';
import {
  CheckFilmScreen,
  HistoryScreen,
  HomeScreen,
  ModalScreen,
  NotFoundScreen,
  SettingNotiScreen,
} from '../screens';
import ModalLoadingScreen from '../screens/ModalLoadingScreen';
import ModalMainLoadingScreen from '../screens/ModalMainLoadingScreen';
import NewFilmScreen from '../screens/NewFilmScreen';
import NotiSettingScreen from '../screens/NotiSettingScreen';
import PostDairyScreen from '../screens/PostDairyScreen';
import SettingWriterScreen from '../screens/SettingWriterScreen';
import { RootMainStackParamList } from '../types';

const MainStack = createNativeStackNavigator<RootMainStackParamList>();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        title: '',
        drawerActiveTintColor: '#272727',
        drawerItemStyle: {
          borderColor: '#272727',
        },
        drawerStyle: {
          backgroundColor: '#e9e9e9',
          width: 240,
        },
        headerTintColor: '#272727',
      }}>
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          drawerLabel: '대시보드 홈',
        }}
      />
      {/* 미구현 */}
      {/* <Drawer.Screen
        name='History'
        component={HistoryScreen}
        options={{
          drawerLabel: '기록 날짜 확인하기',
        }}
      /> */}
      {/* <Drawer.Screen
        name='CheckFilm'
        component={CheckFilmScreen}
        options={{
          drawerLabel: '현상된 필름',
        }}
      /> */}
      <Drawer.Screen
        name='SettingNoti'
        component={SettingNotiScreen}
        options={{
          drawerLabel: '알람 설정',
        }}
      />
      <Drawer.Screen
        name='SettingWriter'
        component={SettingWriterScreen}
        options={{
          drawerLabel: '필명 설정',
        }}
      />
    </Drawer.Navigator>
  );
}

// Main
export default function MainNavigator() {
  const [commonAtom, setCommonAtom] = useRecoilState(commonAtomState);

  useEffect(() => {
    setTimeout(() => {
      setCommonAtom({
        isMainLoading: false,
      });
    }, LOADING_TIME);
  }, []);

  if (commonAtom.isMainLoading) {
    return <ModalMainLoadingScreen />;
  }

  return (
    <MainStack.Navigator
      initialRouteName='MainDraw'
      screenOptions={{
        headerBackTitle: '',
        headerTintColor: '#000',
      }}>
      {/* 1. common Require */}
      <MainStack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: '잘못된 화면입니다.' }}
      />
      <MainStack.Group screenOptions={{ presentation: 'modal' }}>
        <MainStack.Screen name='Modal' component={ModalScreen} />
        {/* <MainStack.Screen name='Web' component={WebViewScreen} /> */}
      </MainStack.Group>
      <MainStack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
          headerShown: false,
          animation: 'none',
        }}>
        <MainStack.Screen name='ModalLoading' component={ModalScreen} />
        <MainStack.Screen
          name='ModalLoadingPost'
          component={ModalLoadingScreen}
        />
        {/* <MainStack.Screen name='Web' component={WebViewScreen} /> */}
      </MainStack.Group>
      {/* 2. Main Draw */}
      <MainStack.Screen
        name='MainDraw'
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      {/* 3. Detail */}
      <MainStack.Group
        screenOptions={{
          title: '',
          presentation: 'card',
        }}>
        <MainStack.Screen name='PostDairy' component={PostDairyScreen} />
        <MainStack.Screen name='NewFilm' component={NewFilmScreen} />
        <MainStack.Screen name='NotiSetting' component={NotiSettingScreen} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
}
