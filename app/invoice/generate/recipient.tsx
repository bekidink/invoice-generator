import { View, Text } from 'react-native';

import KeyboardAwareScrollView from '~/components/KeyboardAwarScrollView';
import CustomInputField from '~/components/CustomInputField';
import CustomButton from '~/components/CustomButton';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { recipientFormData, recipientFormSchema } from '~/schema/invoice';
import { useStore } from '~/store/store';

const InvoiceGenerator = () => {
  const form = useForm<recipientFormData>({
    resolver: zodResolver(recipientFormSchema),
    defaultValues: {
      recipientName: 'kobeki',
      address: 'meg',
      taxId: '12345678',
    },
  });
  const addRecipient=useStore((data)=>data.addRecipient)
  const { control, handleSubmit } = form;

  const onSubmit = (data: any) => {
    addRecipient(data)
    router.push('/invoice/generate/invoice-info');
  };
  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <FormProvider {...form}>
          <View className="px-4">
            <Text className="mb-6 text-2xl font-bold">Recipient Info</Text>

            <View className="space-y-4 pb-24">
              <CustomInputField label="recipient Name" name="recipientName" />

              <CustomInputField label="Address Name" name="address" />

              <CustomInputField label="Tax ID" name="taxId" />
            </View>
          </View>

          <View className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <CustomButton title="Generate Invoice" onPress={handleSubmit(onSubmit)} />
          </View>
        </FormProvider>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default InvoiceGenerator;
