import React, { ReactNode } from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
interface IProps extends ViewProps {
  children?: ReactNode;
  full?: boolean;
  wFull?: boolean;
  row?: boolean;
  center?: boolean;
  jCenter?: boolean;
  aCenter?: boolean;
  right?: boolean;
  jStart?: boolean;
  jEnd?: boolean;
  aStart?: boolean;
  aEnd?: boolean;
  space?: boolean;
  width?: number;
  height?: number;
  pd?: number | string;
  pv?: number | string;
  ph?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  mg?: number | string;
  mv?: number | string;
  mh?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  border?: boolean;
  borderRadius?: number;
  borderBottom?: boolean; //?: [number, string];
  backColor?: string;
  shadow?: boolean; // # 쉐도우 쓸땐 반드시 backgroundColor을 지정해서 같이 써야 한다.
  style?: ViewStyle;
}

const Box: React.FunctionComponent<IProps> = ({
  children,
  full,
  wFull,
  center,
  row,
  jCenter,
  aCenter,
  right,
  jStart,
  jEnd,
  aStart,
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
    jStart && styles().jStart,
    jEnd && styles().jEnd,
    aStart && styles().aStart,
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
    <View style={styleProps} {...rest}>
      {children}
    </View>
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
    jStart: {
      justifyContent: 'flex-start',
    },
    jEnd: {
      justifyContent: 'flex-end',
    },
    aStart: {
      alignItems: 'flex-start',
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

export default Box;
