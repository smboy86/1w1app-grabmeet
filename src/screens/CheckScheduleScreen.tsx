import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { Button, FormControl, Input } from 'native-base';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Calendar } from 'react-native-calendars';

import { Box } from '../components/basic';
import { CalendarThemeOptions } from '../constants/Options';
import dayjs from 'dayjs';
import GrapTime from '../components/GrapTime';
import SelectMember from '../components/SelectMember';
import { useNavigation } from '@react-navigation/native';

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
  member: string;
  time: string[];
};

export default function CheckScheduleScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [grabData, setGrabData] = useState();
  const [objMarkedDays, setObjMarkedDays] = useState();

  const { handleSubmit, control, setValue } = useForm<Inputs>();

  const navigation = useNavigation();

  useEffect(() => {
    console.log('asdfsdf');

    // data bind
    const tempDate = dayjs(new Date()).format('YYYY-MM-DD');
    setGrabData({
      date: tempDate,
      title: '이번주 일정입니다.',
      member: '3',
      grabTime: ['0', '1', '3', '10'],
    });
    // 1) 달력 표기
    setObjMarkedDays({
      [tempDate]: { selected: true },
    });
    // 선택날짜

    // temp
    setIsLoading(false);
  }, []);

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
            navigation.navigate('MyMeetList', {
              meetId: '1',
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (isLoading) return null;
  console.log('ddddd :: ', grabData);
  return (
    <>
      <ScrollView>
        <Box ph={0}>
          <Calendar
            /* @ts-ignore */
            theme={CalendarThemeOptions}
            current={grabData.date}
            markedDates={objMarkedDays}
            disableAllTouchEventsForDisabledDays={true}
            monthFormat={'yyyy년 MM월'}
            enableSwipeMonths={false}
          />
        </Box>
        <Box ph={16} pt={10}>
          <Controller
            name={'date'}
            defaultValue={grabData.date}
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
            defaultValue={grabData.title}
            name={'meetName'}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl mb='5'>
                <FormControl.Label>일정 제목</FormControl.Label>
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
            name={'member'}
            defaultValue={grabData.member}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl mb='5'>
                <FormControl.Label>참여 인원</FormControl.Label>
                <SelectMember
                  value={value}
                  onChangeMember={onChange}
                  viewMode={true}
                />
              </FormControl>
            )}
          />
          <Controller
            name={'time'}
            defaultValue={grabData.grabTime}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl mb='5'>
                <FormControl.Label>시간</FormControl.Label>
                <GrapTime value={value} onChangeTime={onChange} />
              </FormControl>
            )}
          />
        </Box>
      </ScrollView>
      <Box pb={20} ph={16}>
        <Button onPress={handleSubmit(onSubmit)}>일정 잡기</Button>
      </Box>
    </>
  );
}
