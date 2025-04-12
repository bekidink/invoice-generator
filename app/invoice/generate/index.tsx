import { View, Text } from 'react-native';

import KeyboardAwareScrollView from '~/components/KeyboardAwarScrollView';
import CustomInputField from '~/components/CustomInputField';
import CustomButton from '~/components/CustomButton';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useStore } from '~/store/store';
import { senderFormData, senderFormSchema } from '~/schema/invoice';

const InvoiceGenerator = () => {
  const form = useForm<senderFormData>({
    resolver: zodResolver(senderFormSchema),
    defaultValues: {
      senderName: 'beki',
      address: 'bole',
      taxId: '12345',
    },
  });
  const { addSenderInfo } = useStore();
  const { handleSubmit } = form;

  const onSubmit = (data: any) => {
    addSenderInfo(data);
    router.push('/invoice/generate/recipient');
  };
  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <FormProvider {...form}>
          <View className="px-4">
            <Text className="mb-6 text-2xl font-bold">Sender Info</Text>

            <View className="space-y-4 pb-24">
              <CustomInputField label="Sender Name" name="senderName" />

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
