import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { Button, FormControl, Input, Toast } from 'native-base';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Calendar } from 'react-native-calendars';

import { Box } from '../components/basic';
import { CalendarThemeOptions, GrabTimeTable } from '../constants/Options';
import dayjs from 'dayjs';
import SelectMember from '../components/SelectMember';
import { useNavigation } from '@react-navigation/native';
import GrapTimeMember from '../components/GrapTimeMember';

type checkedTime = {
  idx: number;
  labelTime: string;
  checkedUserIds: string[];
};

type Inputs = {
  date: string;
  meetName: string;
  member: string;
  time: checkedTime[];
};

export default function JoinScheduleScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [grabData, setGrabData] = useState();
  const [objMarkedDays, setObjMarkedDays] = useState();

  const { handleSubmit, control, setValue } = useForm<Inputs>();

  const navigation = useNavigation();

  useEffect(() => {
    // hello guest
    Toast.show({
      title: '안녕하세요 guest01님, 시간을 선택해주세요',
      placement: 'top',
    });

    // data bind
    const tempDate = dayjs(new Date()).format('YYYY-MM-DD');
    setGrabData({
      date: tempDate,
      title: '이번주 일정입니다.',
      member: '3',
      grabTime: [],
    });
    // 1) 달력 표기
    setObjMarkedDays({
      [tempDate]: { selected: true },
    });
    // 2) Todo - data bind 선택된 날짜
    // 2-1) 애초에 뿌리기 좋은 리스트를 만들어서 뿌리자
    // origin data 1 - meet (admin 이 최초 잡은 시간)
    const meetData = {
      meetId: 3,
      grabTime: GrabTimeTable.map((item, idx) => {
        return {
          ...item,
          checkedUserIds:
            idx === 0 || idx === 1
              ? ['admin']
              : idx === 3 || idx === 6
              ? ['admin', 'guest02', 'guest03']
              : [], // Dev
        };
      }),
    };

    // console.log('asdfsdaf :: ', meetData);
    // Todo - DB 최적화가 필요하다. 일단 나중으로 미룬다.
    // origin data 2 - myGrabTime (내가 잡은 시간)
    // const myGrabData = {
    //   meetId: 3,
    //   userId: 'guest01',
    //   grabTime: ['0', '1'],
    // };

    setValue('time', meetData.grabTime);
    setIsLoading(false);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Todo
    // - 어드민 : 마감,
    // - 참여자 : 확정
    console.log('onSubmit :: ', data);
    Alert.alert(
      '',
      '일정을 확정하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (isLoading) return null;
  // console.log('ddddd :: ', grabData);
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
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl mb='5'>
                <FormControl.Label>시간</FormControl.Label>
                <GrapTimeMember
                  checkedTimeList={value}
                  onChangeTime={onChange}
                  curMemberId={'guest01'} // Todo
                />
              </FormControl>
            )}
          />
        </Box>
      </ScrollView>
      <Box pb={20} ph={16}>
        {false ? (
          <Button onPress={handleSubmit(onSubmit)}>마감</Button>
        ) : (
          <Button onPress={handleSubmit(onSubmit)}>확정</Button>
        )}
      </Box>
    </>
  );
}
