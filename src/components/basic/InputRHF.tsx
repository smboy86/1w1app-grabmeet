import { IInputProps, Input } from 'native-base';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface IProps extends IInputProps {
  name: string;
  control: any;
}

const InputRHF: React.FunctionComponent<IProps> = ({
  name,
  control,
  ...rest
}: IProps) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });
  return <Input {...rest} value={field.value} onChangeText={field.onChange} />;
};

export default InputRHF;
