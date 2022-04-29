import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
// import RootNavigator from './navigation/RootNavigator';

import 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';
import { extendTheme, NativeBaseProvider } from 'native-base';
import RootNavigator from './src/navigation/RootNavigator';

// init config
import { LocaleConfig } from 'react-native-calendars';
LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

const nativeBaseTheme = extendTheme({
  // 22.03.15 devpoi - custom Theme
  components: {
    Button: {
      baseStyle: {
        _text: {
          color: '#fff',
          fontWeight: 'bold',
        },
      },
      defaultProps: {
        colorScheme: 'light',
        size: 'lg',
      },
    },
    Input: {
      baseStyle: {
        color: '#000',
        placeholderTextColor: '#e9e9e9',
        // 두 방식 모두 작동하지 않음
        // _focus: {
        //   borderColor: 'red',
        // },
        // _focus: {
        //   style: {
        //     borderColor: 'red',
        //   },
        // },
        borderColor: '#000',
      },
      defaultProps: {
        // variant: 'underlined',
        variant: 'underlined',
        autoCapitalize: 'none',
      },
    },
  },
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RecoilRoot>
          <NativeBaseProvider theme={nativeBaseTheme}>
            <RootNavigator />
            <StatusBar />
          </NativeBaseProvider>
        </RecoilRoot>
      </SafeAreaProvider>
    );
  }
}
