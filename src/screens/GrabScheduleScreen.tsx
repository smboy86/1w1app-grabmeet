import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { Button, FormControl, Input } from 'native-base';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Calendar } from 'react-native-calendars';

import { Box } from '../components/basic';
import { CalendarThemeOptions } from '../constants/Options';
import dayjs from 'dayjs';
import GrapTime from '../components/GrapTime';
import SelectMember from '../components/SelectMember';

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
            defaultValue={'달력을 선택하세요.'}
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
          <Controller
            name={'member'}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl mb='5'>
                <FormControl.Label>참여 인원</FormControl.Label>
                <SelectMember value={value} onChangeMember={onChange} />
              </FormControl>
            )}
          />
          <Controller
            name={'time'}
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
