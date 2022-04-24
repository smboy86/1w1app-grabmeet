import { Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';

import { Box } from '../components/basic';
import dayjs from 'dayjs';
import { useState } from 'react';
import { CalendarThemeOptions } from '../constants/Options';

type SelectCalendar = {
  dateString: string; //"2021-10-06",
  day: number; //6,
  month: number; //10,
  timestamp: number; //1633478400000,
  year: number; //2021,
};

export default function HomeScreen() {
  const [objMarkedDays, setObjMarkedDays] = useState({
    [dayjs(new Date()).format('YYYY-MM-DD')]: { selected: true },
  }); // 일정 있는 날짜 (달력 Markd 포멧)

  const onPressCal = (day: SelectCalendar) => {
    console.log('달력 선택 ::: ', day);
    // 1) 달력에 마커 생
    // 2) 재검색
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box
        border
        style={
          {
            // width: 300,
          }
        }>
        <Calendar
          /* @ts-ignore */
          theme={CalendarThemeOptions}
          current={dayjs(new Date()).format('YYYY-MM-DD')}
          onDayPress={(day) => onPressCal(day)}
          markedDates={objMarkedDays}
          disableAllTouchEventsForDisabledDays={true}
          monthFormat={'yyyy년 MM월'}
          enableSwipeMonths={false}
          // style={{
          //   width: 300,
          //   height: 200,
          // }}
        />
      </Box>
    </SafeAreaView>
  );
}
