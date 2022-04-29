import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRecoilState } from 'recoil';
import commonAtomState from '../recoil/common/commonAtomState';
import { GrabScheduleScreen, NotFoundScreen } from '../screens';
import { RootMainStackParamList } from '../../types';

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
        name='GrabSchedule'
        component={GrabScheduleScreen}
        options={{
          drawerLabel: '일정잡기 Home',
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
      {/* <MainStack.Group screenOptions={{ presentation: 'modal' }}>
        <MainStack.Screen name='Modal' component={ModalScreen} />
      </MainStack.Group> */}
      {/* <MainStack.Group
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
      </MainStack.Group> */}
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
        <MainStack.Screen name='DetailHome' component={GrabScheduleScreen} />
        {/* <MainStack.Screen name='PostDairy' component={PostDairyScreen} />
        <MainStack.Screen name='NewFilm' component={NewFilmScreen} />
        <MainStack.Screen name='NotiSetting' component={NotiSettingScreen} /> */}
      </MainStack.Group>
    </MainStack.Navigator>
  );
}
