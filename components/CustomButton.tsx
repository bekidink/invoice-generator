import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

type CustomButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary' | 'link';
} & TouchableOpacityProps;

const variantStyles = {
  primary: {
    button: 'bg-blue-500 rounded-md items-center p-4',
    text: 'text-white',
  },
  secondary: {
    button: 'bg-transparent border border-blue-500 rounded-md items-center p-4',
    text: 'text-blue-500',
  },
  link: {
    button: 'bg-transparent items-center p-4',
    text: 'text-blue-500 text-lg font-semibold text-center underline',
  },
};

export default function CustomButton({
  title,
  variant = 'primary',
  className = '',
  ...props
}: CustomButtonProps) {
  return (
    <TouchableOpacity className={`${variantStyles[variant].button}`} {...props}>
      <Text className={`${variantStyles[variant].text}`}>{title}</Text>
    </TouchableOpacity>
  );
}
