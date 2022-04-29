import React from 'react';
import { Text as TextRN, TextStyle, TextProps, Platform } from 'react-native';

interface IProps extends TextProps {
  light?: boolean;
  regular?: boolean;
  medium?: boolean;
  bold?: boolean;
  size?: number;
  color?: string;
  lineHeight?: number;
  style?: TextStyle;
  children: any;
}

export default function Text(props: IProps) {
  const {
    size,
    color = '#000',
    light = false,
    regular = false,
    medium = false,
    bold = false,
    lineHeight,
    style,
    children,
    ...newProps
  } = props;

  // 1) font 전역 설정 Type A : fontWeight 동일해야하는 글씨체일때
  // let font = { fontFamily: 'NotoSansKR-Regular', fontWeight: 'normal' };

  // 2) font 전역 설정 Type B : 위와 같은 폰트가 아닐때
  // ex) Android는 폰트 파일 명으로 작동 (파일명에 굵기 포함 - fontFamily: 'netmarbleL',)
  // ex) IOS 파일 안에 폰트 속성으로 작동 (fontFamily: 'netmarble', fontWeight: '700')
  let fontStyle = {};
  if (Platform.OS === 'android') {
    fontStyle = {
      letterSpacing: -0.3,
      // fontFamily: light
      //   ? 'spoqaLight'
      //   : regular
      //   ? 'spoqaRegular'
      //   : medium
      //   ? 'spoqaMedium'
      //   : bold
      //   ? 'spoqaBold'
      //   : 'spoqaRegular',
      // fontWeight: light ? '300' : bold ? '700' : '500',
    };
  } else if (Platform.OS === 'ios') {
    // fontStyle = {
    //   fontFamily: 'netmarble',
    //   fontWeight: light ? '300' : bold ? '700' : '500',
    // };
    fontStyle = {
      // letterSpacing: -0.3,
      // fontFamily: light
      //   ? 'spoqaLight'
      //   : regular
      //   ? 'spoqaRegular'
      //   : medium
      //   ? 'spoqaMedium'
      //   : bold
      //   ? 'spoqaBold'
      //   : 'spoqaRegular',
      // fontWeight: light ? '300' : bold ? '700' : '500',
    };
  }

  return (
    <TextRN
      {...newProps}
      style={[style, fontStyle, { fontSize: size, color, lineHeight }]}>
      {children}
    </TextRN>
  );
}
