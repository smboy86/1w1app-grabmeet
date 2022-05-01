import React from 'react';
import { CheckIcon, Select } from 'native-base';

interface Props {
  value: string;
  onChangeMember: any;
  viewMode?: boolean;
}

const SelectMember: React.FunctionComponent<Props> = ({
  value,
  onChangeMember,
  viewMode,
}) => {
  let [service, setService] = React.useState(value);

  const changeMember = (member: string) => {
    setService(member);
    onChangeMember(member);
  };

  return (
    <Select
      selectedValue={service}
      minWidth='200'
      accessibilityLabel='선택해주세요'
      placeholder='선택해주세요'
      _selectedItem={{
        bg: 'light.300',
        endIcon: <CheckIcon size='5' />,
      }}
      mt={1}
      isDisabled={viewMode}
      onValueChange={(itemValue) => changeMember(itemValue)}>
      <Select.Item label='1명' value='1' />
      <Select.Item label='2명' value='2' />
      <Select.Item label='3명' value='3' />
      <Select.Item label='4명' value='4' />
      <Select.Item label='5명' value='5' />
    </Select>
  );
};

export default SelectMember;
