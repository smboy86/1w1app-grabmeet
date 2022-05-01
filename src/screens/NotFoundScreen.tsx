import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BoxPressable } from '../components/basic';

export default function NotFoundScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: (props: any) => (
        <BoxPressable
          onPress={() =>
            navigation.navigate('NewFilm', {
              lastFilmIndex: filmList.length,
            })
          }
          pr={12}>
          <Feather name='film' size={24} color={props.tintColor} />
        </BoxPressable>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainDraw')}
        style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
