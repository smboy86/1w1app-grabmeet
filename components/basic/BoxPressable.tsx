import React, { ReactNode } from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
interface IProps extends PressableProps {
  onPress: () => void;
  onLongPress?: () => void;
  children?: ReactNode;
  full?: boolean;
  wFull?: boolean;
  row?: boolean;
  center?: boolean;
  jCenter?: boolean;
  aCenter?: boolean;
  right?: boolean;
  jEnd?: boolean;
  aEnd?: boolean;
  space?: boolean;
  width?: number;
  height?: number;
  pd?: number;
  pv?: number;
  ph?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  mg?: number;
  mv?: number;
  mh?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  border?: boolean;
  borderRadius?: number;
  borderBottom?: boolean; //?: [number, string];
  backColor?: string;
  shadow?: boolean; // # 쉐도우 쓸땐 반드시 backgroundColor을 지정해서 같이 써야 한다.
  style?: ViewStyle;
}

const BoxPressable: React.FunctionComponent<IProps> = ({
  children,
  full,
  wFull,
  center,
  row,
  jCenter,
  aCenter,
  right,
  jEnd,
  aEnd,
  space,
  width,
  height,
  pd,
  pv,
  ph,
  pt,
  pb,
  pl,
  pr,
  mg,
  mv,
  mh,
  mt,
  mb,
  ml,
  mr,
  border,
  borderRadius,
  borderBottom,
  backColor,
  shadow,
  style,
  ...rest
}: IProps) => {
  const styleProps = [
    row && styles().row,
    full && styles().full,
    wFull && styles().wFull,
    center && styles().center,
    jCenter && styles().jCenter,
    aCenter && styles().aCenter,
    jEnd && styles().jEnd,
    aEnd && styles().aEnd,
    space && styles().space,
    width && { width }, // 이런 형식에서 typescript 구성 찾아야 할듯
    height && { height },
    pd && { padding: pd },
    pv && { paddingVertical: pv },
    ph && { paddingHorizontal: ph },
    pt && { paddingTop: pt },
    pb && { paddingBottom: pb },
    pl && { paddingLeft: pl },
    pr && { paddingRight: pr },
    mg && { margin: mg },
    mv && { marginVertical: mv },
    mh && { marginHorizontal: mh },
    mt && { marginTop: mt },
    mb && { marginBottom: mb },
    ml && { marginLeft: ml },
    mr && { marginRight: mr },
    border && styles().border,
    borderRadius && { borderRadius },
    borderBottom && styles().borderBottom,
    backColor && { backgroundColor: backColor },
    shadow && styles().shadow,
    style,
  ];

  return (
    <Pressable style={styleProps} {...rest}>
      {children}
    </Pressable>
  );
};

// Todo - theme 구성
const styles = () =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    full: {
      flex: 1,
    },
    wFull: {
      width: '100%',
    },
    jCenter: {
      justifyContent: 'center',
    },
    aCenter: {
      alignItems: 'center',
    },
    jEnd: {
      justifyContent: 'flex-end',
    },
    aEnd: {
      alignItems: 'flex-end',
    },
    space: {
      justifyContent: 'space-between',
    },
    border: {
      borderWidth: 1,
      borderColor: 'red',
      borderStyle: 'solid',
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderColor: '#747474',
    },
    shadow: {
      // shadowColor: theme.COLORS.BLOCK,
      shadowColor: 'rgba(0, 0, 0, 0.12)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 1,
      // shadowRadius: 5,
      elevation: 5,
    },
  });

export default BoxPressable;
