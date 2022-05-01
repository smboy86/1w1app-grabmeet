import dayjs from 'dayjs';

export const GrabTimeTable = [...Array(24)].map((_, idx) => {
  return {
    idx: idx,
    labelTime: `${dayjs().hour(idx).format('HH')}:00 ~ ${
      dayjs().hour(idx).format('HH') === '23'
        ? '24'
        : dayjs()
            .hour(idx + 1)
            .format('HH')
    }:00`,
  };
});

export const CalendarThemeOptions = {
  calendarBackground: '#ffffff' /* 전체 달력 백그라운드 색상 */,
  selectedDayTextColor: 'orange' /* 선택된 날짜의 텍스트 색상 */,
  selectedDayBackgroundColor:
    '#e9e9e9' /* 선택된 날짜의 배경 색상 (동그라미) */,
  todayTextColor: '#000000',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  // dotColor: '#00adf5',
  selectedDotColor: '#000',
  monthTextColor: '#000000',
  indicatorColor: 'blue',
  // textMonth : 1) 월 + 년 헤더
  // textMonthFontFamily: 'spoqaMedium',
  textMonthFontSize: 13,
  textMonthFontWeight: '700',
  // textDayHeader : 2) 헤더 + 주 표시 텍스트
  // textDayHeaderFontFamily: 'spoqaMedium',
  textDayHeaderFontSize: 13,
  textDayHeaderFontWeight: '700',
  // textSectionTitleColor: Colors.default.backgroundTintColor,
  // textSectionTitleDisabledColor: Colors.default.backgroundTintColor, // 토 일
  // etc
  // textDayFontFamily: 'spoqaMedium',
  textDayFontSize: 11,
  textDayFontWeight: '500',
  // etc
  arrowColor: '#000',
  'stylesheet.calendar.header': {
    dayTextAtIndex0: {
      color: '#e47364',
    },
  },
  selectedMonthText: {
    color: 'purple',
  },
};
