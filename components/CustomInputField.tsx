import { TextInput, TextInputProps, View, Text } from 'react-native';

type CustomInputFieldProps = {
  label: string;
} & TextInputProps;
export default function CustomInputField({ label, ...props }: CustomInputFieldProps) {
  return (
    <View className="mb-4">
      <Text className="mb-1 text-gray-600">{label}</Text>
      <TextInput
        {...props}
        className={`w-full rounded-md border border-gray-300 p-2 ${props.className}`}
      />
    </View>
  );
}
