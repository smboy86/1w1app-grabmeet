import { useEffect, useState } from 'react';
import { FlatList, Spacer, Text, VStack, Box as BoxNB } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, BoxPressable } from '../components/basic';

const Example = ({ navigation }) => {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '일정 제목',
      date: '2022-04-22',
      complete: false,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '일정 제목 2',
      date: '2022-04-22',
      complete: true,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '일정 제목3',
      date: '2022-04-22',
      complete: true,
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      title: '일정 제목 4',
      date: '2022-04-22',
      complete: false,
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      title: '일정 제목5',
      date: '2022-04-22',
      complete: false,
    },
  ];
  return (
    <BoxNB
      style={{
        flex: 1,
      }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            pv={12}
            ph={16}
            mb={4}
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}>
            <Box row space>
              <Feather name='calendar' size={24} color='black' />
              <Box pl={6}>
                <Box row>
                  <Text color='coolGray.800' bold>
                    {item.title}
                  </Text>
                  <Text color='coolGray.600' fontSize={'sm'}>
                    {' '}
                    {item.date}
                  </Text>
                </Box>
                <Box>
                  <Text color='coolGray.600'>참여인원 5명</Text>
                </Box>
              </Box>
              <Spacer />
              <BoxPressable
                onPress={() =>
                  navigation.navigate('InviteSchedule', {
                    meetId: 3,
                  })
                }
                center
                ph={6}
                mh={4}
                border
                borderRadius={8}
                style={{
                  borderColor: 'gray',
                }}>
                <Text>초대</Text>
              </BoxPressable>
              <BoxPressable
                onPress={() =>
                  navigation.navigate('CheckSchedule', {
                    meetId: 3,
                  })
                }
                center
                ph={6}
                borderRadius={8}
                border
                style={{
                  borderColor: 'gray',
                }}>
                <Text>현황</Text>
              </BoxPressable>
            </Box>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </BoxNB>
  );
};

export default function MyMeetListScreen() {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params !== undefined) {
      navigation.navigate('InviteSchedule', {
        meetId: route.params.meetId,
      });
    }

    return () => {
      // 한번 진입하면 자동 띄우기 삭제
      route.params = undefined;
    };
  }, []);

  return (
    <Box full>
      <Example navigation={navigation} />
    </Box>
  );
}
