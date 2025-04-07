import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

type CustomButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary';
} & TouchableOpacityProps;

export default function CustomButton({
  title,
  variant = 'primary',
  className = '',
  ...props
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      className={`rounded-md py-3 ${
        variant === 'primary' ? 'bg-blue-500' : 'bg-gray-200'
      } ${className}`}
      {...props}>
      <Text
        className={`text-center font-semibold ${
          variant === 'primary' ? 'text-white' : 'text-gray-800'
        }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
