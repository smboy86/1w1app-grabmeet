/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

///
// navigation 구조
/**
 *  Login not  ----- AuthNavigator[Stack]
 *               ㄴ-- MainNavigator[Stack - Draw, Stack, Stack] ----- NotFound[Screen]
 *                                                               ㄴ-- Modal[Screen]
 *                                                               ㄴ-- 메인화면[DrawStack]
 *                                                                      ㄴ-- 홈 [Screen]
 *                                                                      ㄴ-- etc... [Screens ...]
 *
 *
 */

// 1-1. Root - Auth(Stack)
export type RootAuthStackParamList = {
  Login: undefined;
  Join: undefined;
  SearchPasswrd: undefined;
};

// 1-2. Root - Main(Draw + Stack)
export type RootMainStackParamList = {
  // 1. Common
  // Modal: undefined;
  // ModalLoading: undefined;
  // ModalLoadingPost: {
  //   nextScreen: string;
  // };
  NotFound: undefined;
  // 2. Main
  MainDraw: NavigatorScreenParams<MainDrawParamList> | undefined;
  // 3. Detail Screen
  InviteSchedule: {
    meetId: string;
  };
  CheckSchedule: {
    meetId: string;
  };
};

// 1-2-1 Draw
export type MainDrawParamList = {
  MyMeetList: {
    meetId: string;
  };
  GrabSchedule: undefined;
  Setting: undefined;
  // History: {
  //   id: string;
  //   uid: string;
  // };
  // CheckFilm: undefined;
  // SettingNoti: undefined;
  // SettingWriter: undefined;
};

// useNavigation 만 쓴다고 하면 필요 없는건가?
// ScreenProp vs RouteProp vs NavigationProp 뭐가 다른가?
// ScreenProp ?? 어디다 쓰는지 모름
// RouteProp -> useRoute 할때 쓰임
// NavigationProp -> useNavigation 에 쓰임
// // 2-1. Root - AuthStack Prop(ScreenProp)
export type RootAuthStackScreenProps<
  Screen extends keyof RootAuthStackParamList
> = NativeStackNavigationProp<RootAuthStackParamList, Screen>;

// 2-2-1. Root - Main Prop (ScreenProp)
export type RootMainScreenProps<Screen extends keyof RootMainStackParamList> =
  CompositeScreenProps<
    DrawerScreenProps<RootMainStackParamList, Screen>,
    NativeStackScreenProps<RootMainStackParamList>
  >;
// Root (NavigationProp) :: 씀
export type RootMainNavigateProps<Screen extends keyof RootMainStackParamList> =
  CompositeNavigationProp<
    DrawerNavigationProp<RootMainStackParamList, Screen>,
    NativeStackNavigationProp<RootMainStackParamList>
  >;
// Root Main RouteProp
export type RootMainRouteProps<Screen extends keyof RootMainStackParamList> =
  RouteProp<RootMainStackParamList, Screen>;

// 2-2-2. Root - Draw (ScreenProp)
// export type MainDrawScreenProps<Screen extends keyof MainDrawParamList> =
//   NativeStackScreenProps<MainDrawParamList, Screen>;
// 2-2-2. Root - Draw (NavigationProp)
export type MainDrawStackNavigateProps<Screen extends keyof MainDrawParamList> =
  NativeStackNavigationProp<MainDrawParamList, Screen>;
// 2-2-3. Root - Draw (RouteProp)
export type MainDrawRouteProps<Screen extends keyof MainDrawParamList> =
  RouteProp<MainDrawParamList, Screen>;

// 999. fin MainStack for useNavigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootMainStackParamList {}
  }
}
