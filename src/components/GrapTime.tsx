import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Checkbox, Icon, IInputProps, Input, Text } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import { Box } from './basic';

interface Props {
  value: string[];
  onChangeTime: any;
}

const GrapTime: React.FunctionComponent<Props> = ({ value, onChangeTime }) => {
  const [groupValues, setGroupValues] = useState(value || []);

  const [grabTime, setGrabTime] = useState(
    [...Array(24)].map((_, idx) => {
      return {
        labelTime: `${dayjs().hour(idx).format('HH')}:00 ~ ${
          dayjs().hour(idx).format('HH') === '23'
            ? '24'
            : dayjs()
                .hour(idx + 1)
                .format('HH')
        }:00`,
      };
    })
  );

  const changeGrabTime = (value: string[]) => {
    setGroupValues(value);
    onChangeTime(value);
  };

  return (
    <Checkbox.Group
      onChange={changeGrabTime}
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
                colorScheme='light'
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

export default GrapTime;
