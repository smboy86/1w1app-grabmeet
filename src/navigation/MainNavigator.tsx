import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilState } from 'recoil';
import commonAtomState from '../recoil/common/commonAtomState';
import {
  GrabScheduleScreen,
  MyMeetListScreen,
  NotFoundScreen,
  InviteScheduleScreen,
  SettingScreen,
  CheckScheduleScreen,
} from '../screens';
import { MainDrawParamList, RootMainStackParamList } from '../../types';

const MainStack = createNativeStackNavigator<RootMainStackParamList>();
const Drawer = createDrawerNavigator<MainDrawParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        unmountOnBlur: true,
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
        name='GrabSchedule'
        component={GrabScheduleScreen}
        options={{
          title: 'Grab Meet',
          drawerLabel: '일정잡기 Home',
        }}
      />
      <Drawer.Screen
        name='MyMeetList'
        component={MyMeetListScreen}
        options={{
          title: 'Meetings',
          drawerLabel: '나의 미팅리스트',
        }}
      />
      <Drawer.Screen
        name='Setting'
        component={SettingScreen}
        options={{
          title: '설정',
          drawerLabel: '설정',
        }}
      />
    </Drawer.Navigator>
  );
}

// Main
export default function MainNavigator() {
  const [commonAtom, setCommonAtom] = useRecoilState(commonAtomState);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCommonAtom({
  //       isMainLoading: false,
  //     });
  //   }, LOADING_TIME);
  // }, []);

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
      {/* 2. Modal */}
      <MainStack.Group screenOptions={{ presentation: 'modal' }}>
        <MainStack.Screen
          name='InviteSchedule'
          component={InviteScheduleScreen}
          options={{
            title: '미팅 초대',
          }}
        />
      </MainStack.Group>
      {/* 3. Main Draw */}
      <MainStack.Screen
        name='MainDraw'
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      {/* 4. Detail - with Web */}
      <MainStack.Group
        screenOptions={{
          title: '',
          presentation: 'card',
        }}>
        <MainStack.Screen
          name='CheckSchedule'
          component={CheckScheduleScreen}
          options={{
            title: '미팅 투표',
          }}
        />
        {/* <MainStack.Screen name='PostDairy' component={PostDairyScreen} />
        <MainStack.Screen name='NewFilm' component={NewFilmScreen} />
        <MainStack.Screen name='NotiSetting' component={NotiSettingScreen} /> */}
      </MainStack.Group>
    </MainStack.Navigator>
  );
}
