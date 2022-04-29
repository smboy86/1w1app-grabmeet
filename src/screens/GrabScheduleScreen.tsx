import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Checkbox, FormControl, Icon, Input, Text } from 'native-base';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Calendar } from 'react-native-calendars';

import { Box } from '../components/basic';
import dayjs from 'dayjs';
import { CalendarThemeOptions } from '../constants/Options';

type SelectCalendar = {
  dateString: string; //"2021-10-06",
  day: number; //6,
  month: number; //10,
  timestamp: number; //1633478400000,
  year: number; //2021,
};

type Inputs = {
  date: string;
  meetName: string;
};

const GrabTime = () => {
  const [groupValues, setGroupValues] = useState(['1', '2']);
  const [grabTime, setGrabTime] = useState([
    {
      labelTime: '09:00 ~ 10:00',
      isGrab: false,
    },
    {
      labelTime: '10:00 ~ 11:00',
      isGrab: false,
    },
    {
      labelTime: '11:00 ~ 12:00',
      isGrab: false,
    },
    {
      labelTime: '12:00 ~ 13:00',
      isGrab: false,
    },
  ]);

  return (
    <Checkbox.Group
      onChange={setGroupValues}
      value={groupValues}
      accessibilityLabel='choose Time'>
      {grabTime.map((item, idx) => {
        return (
          <Box row space key={idx.toString()}>
            <Box
              aCenter
              style={{
                flex: 0.4,
              }}>
              <Box
                center
                style={{
                  height: 44,
                }}>
                <Text>{item.labelTime}</Text>
              </Box>
            </Box>
            <Box
              center
              style={{
                flex: 0.6,
              }}>
              <Checkbox
                value={idx.toString()}
                colorScheme='gray'
                size='lg'
                accessibilityLabel='iconGrabTime'
                my={2}
                icon={<Icon as={FontAwesome} name='hand-grab-o' />}
                defaultIsChecked
              />
            </Box>
          </Box>
        );
      })}
    </Checkbox.Group>
  );
};

export default function GrabScheduleScreen() {
  const [objMarkedDays, setObjMarkedDays] = useState({
    [dayjs(new Date()).format('YYYY-MM-DD')]: { selected: true },
  }); // 일정 있는 날짜 (달력 Markd 포멧)

  const { handleSubmit, control, setValue } = useForm<Inputs>();

  const onPressCal = (day: SelectCalendar) => {
    console.log('달력 선택 ::: ', day);
    // 1) 달력에 마커 생
    setObjMarkedDays({
      [day.dateString]: {
        selected: true,
      },
    });
    // 2) 재검색
    // 3) 선택 날짜 데이터 셋팅
    setValue('date', day.dateString);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('onSubmit :: ', data);
    Alert.alert(
      '',
      '일정을 생성하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            Alert.alert('', '(dev) 일정이 생성되었습니다');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView>
        <Box ph={0}>
          <Calendar
            /* @ts-ignore */
            theme={CalendarThemeOptions}
            current={dayjs(new Date()).format('YYYY-MM-DD')}
            onDayPress={(day) => onPressCal(day)}
            markedDates={objMarkedDays}
            disableAllTouchEventsForDisabledDays={true}
            monthFormat={'yyyy년 MM월'}
            enableSwipeMonths={false}
          />
        </Box>
        <Box ph={16} pt={10}>
          <Controller
            name={'date'}
            defaultValue={'0000-00-00'}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl mb='5'>
                <FormControl.Label>선택 날짜</FormControl.Label>
                <Input
                  isDisabled
                  value={value}
                  onChangeText={onChange}
                  variant={'rounded'}
                  _focus={{
                    backgroundColor: 'transparent',
                    borderColor: 'light.400',
                  }}
                />
              </FormControl>
            )}
          />
          <Controller
            name={'meetName'}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl mb='5'>
                <FormControl.Label>일정 제목</FormControl.Label>
                <Input
                  value={value}
                  onChangeText={onChange}
                  variant={'rounded'}
                  _focus={{
                    backgroundColor: 'transparent',
                    borderColor: 'light.400',
                  }}
                />
              </FormControl>
            )}
          />
          <Box>
            <Text fontSize={'sm'} color={'coolGray.700'}>
              시간
            </Text>
          </Box>
          <GrabTime />
        </Box>
      </ScrollView>
      <Box pb={20} ph={16}>
        <Button onPress={handleSubmit(onSubmit)}>일정 잡기</Button>
      </Box>
    </>
  );
}
