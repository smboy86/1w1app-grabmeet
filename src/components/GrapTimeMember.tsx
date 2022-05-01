import React, { useState } from 'react';
import { Text } from 'native-base';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

import { Box, BoxPressable } from './basic';
import Layout from '../constants/Layout';

type checkedTime = {
  idx: number;
  labelTime: string;
  checkedUserIds: string[];
};

interface Props {
  onChangeTime: any;
  checkedTimeList: checkedTime[] | [];
  curMemberId: string;
}

const GrapTimeMember: React.FunctionComponent<Props> = ({
  onChangeTime,
  curMemberId,
  checkedTimeList,
}) => {
  const changeGrabTime = (isGrab: boolean, timeIdx: number) => {
    const tempTimeList = checkedTimeList.map((item, idx) => {
      if (idx === timeIdx) {
        if (isGrab) {
          // 넣고
          let tempPushIds = item.checkedUserIds;
          tempPushIds.push(curMemberId);
          return {
            ...item,
            checkedUserIds: tempPushIds,
          };
        } else {
          // 뺀다
          return {
            ...item,
            checkedUserIds: item.checkedUserIds.filter(
              (item) => item !== curMemberId
            ),
          };
        }
      } else {
        return item;
      }
    });
    onChangeTime(tempTimeList);
  };

  return checkedTimeList.map((item, idx) => {
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
          {/* 
            0. case 종류
              - 1) 아무 날짜도 아닌 날
              - 2) 나 아닌 다른 사람이 잡은 날
              - 3) 내가 잡은 날
            
            1. 체크 아이디가 있으면 -> +
            2. 체크 아이디가 나와 같으면 -> X
            3. 아무것도 아닐때 -> (체크 박스)
          */}
          {/* {console.log('11111 :: ', checkedTimeList[idx].checkedUserIds.length)} */}
          {checkedTimeList[idx].checkedUserIds.length > 0 ? (
            <BoxPressable
              mv={4}
              pd={8}
              backColor='#c4c4c4'
              borderRadius={8}
              onPress={() =>
                changeGrabTime(
                  !checkedTimeList[idx].checkedUserIds.includes(curMemberId),
                  idx
                )
              }>
              <Box
                row
                space
                aCenter
                pl={10}
                style={{
                  width: Layout.window.width * 0.4,
                }}>
                <Box>
                  {checkedTimeList[idx].checkedUserIds.map((item, idx) => {
                    return <Text key={idx.toString()}>{item}</Text>;
                  })}
                </Box>
                {checkedTimeList[idx].checkedUserIds.includes(curMemberId) >
                0 ? (
                  <EvilIcons name='close' size={24} color='black' />
                ) : (
                  <FontAwesome name='hand-grab-o' size={24} color='black' />
                )}
              </Box>
            </BoxPressable>
          ) : (
            <BoxPressable
              mv={4}
              pd={8}
              backColor='#fff'
              borderRadius={8}
              onPress={() =>
                changeGrabTime(
                  !checkedTimeList[idx].checkedUserIds.includes(curMemberId),
                  idx
                )
              }>
              <FontAwesome name='hand-grab-o' size={24} color='black' />
            </BoxPressable>
          )}
        </Box>
      </Box>
    );
  });
};

export default GrapTimeMember;
