/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootMainStackParamList } from '../../types';

const linking: LinkingOptions<RootMainStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      MainDraw: {
        screens: {
          Home: 'home',
        },
      },
      DetailHome: 'detail',
      // Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
