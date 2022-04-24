import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  screen: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  // isSmallDevice: width <= 375, // X 버전도 375 걸림
  isSmallDevice: height <= 800,
};

export const pxToDp = (size: number) => {
  return (size / 390) * width;
};
