import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
// import RootNavigator from './navigation/RootNavigator';

import 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';
import { extendTheme, NativeBaseProvider, Text } from 'native-base';
import { Box } from './components/basic';
import { HomeScreen } from './screens';

// 유의사항
// 선언한 스타일이 Object면 인라인스타일도 Object여야 병합
// 하나는 Array, 다른 하나는 Obejct면 스타일 병합 되지 않음
const DefaultColorTheme = {
  border: '#f4f4f4',
};

const ElementsTheme = {
  Text: {
    style: {
      fontFamily: 'Apple SD Gothic Neo',
      color: '#262626',
      fontSize: 16,
    },
  },
  Button: {
    raised: true,
    type: 'outline',
    titleStyle: {
      color: '#262626',
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonStyle: {
      borderColor: DefaultColorTheme.border,
      backgroundColor: '#eeeeee',
    },
    loadingProps: { size: 'small', color: '#000' },
    containerStyle: {
      height: 38,
    },
  },
};

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
        borderColor: '#000',
        _focus: {
          borderColor: '#000',
        },
      },
      defaultProps: {
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
            <HomeScreen />
            {/* <RootNavigator /> */}
            <StatusBar />
          </NativeBaseProvider>
        </RecoilRoot>
      </SafeAreaProvider>
    );
  }
}
