import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAwareScrollView from '~/components/KeyboardAwarScrollView';
import CustomInputField from '~/components/CustomInputField';
import CustomButton from '~/components/CustomButton';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';

const senderFormSchema = z.object({
  senderName: z.string().min(1, 'Sender Name is required'),
  address: z.string().min(1, 'Address is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
});

type senderFormData = z.infer<typeof senderFormSchema>;

const InvoiceGenerator = () => {
  const form = useForm<senderFormData>({
    resolver: zodResolver(senderFormSchema),
    defaultValues: {
      senderName: 'beki',
      address: 'bole',
      taxId: '12345',
    },
  });
  const { control, handleSubmit } = form;
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    taxid: '',
    amount: '',
    description: '',
  });
  const onSubmit = (data: any) => {
    console.log(data);
    router.push('/invoice/generate/recipient');
  };
  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <FormProvider {...form}>
          <View className="px-4">
            <Text className="mb-6 text-2xl font-bold">Sender Info</Text>

            <View className="space-y-4 pb-24">
              <CustomInputField label="Sender Name" name="senderName" control={control} />

              <CustomInputField label="Address Name" control={control} name="address" />

              <CustomInputField label="Tax ID" control={control} name="taxId" />
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
