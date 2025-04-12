import {  useController } from 'react-hook-form';
import { TextInput, TextInputProps, View, Text } from 'react-native';

type CustomInputFieldProps = {
  label: string;
  name: string;
} & TextInputProps;
export default function CustomInputField({
  label,
  name,
  ...props
}: CustomInputFieldProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, rules: { required: `${label} is required` } });
  return (
    <View className="mb-4">
      <Text className="mb-1 text-gray-600">{label}</Text>
      <TextInput
        {...props}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        className={`w-full rounded-md border border-gray-300 p-2 ${props.className}`}
      />
      <Text className="text-red-500">{error?.message}</Text>
    </View>
  );
}
