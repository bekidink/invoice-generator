import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAwareScrollView from '~/components/KeyboardAwarScrollView';
import CustomInputField from '~/components/CustomInputField';
import CustomButton from '~/components/CustomButton';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const recipientFormSchema = z.object({
  recipientName: z.string().min(1, 'recipient Name is required'),
  address: z.string().min(1, 'Address is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
});

type recipientFormData = z.infer<typeof recipientFormSchema>;

const InvoiceGenerator = () => {
  const form = useForm<recipientFormData>({
    resolver: zodResolver(recipientFormSchema),
    defaultValues: {
      recipientName: 'kobeki',
      address: 'meg',
      taxId: '12345678',
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <FormProvider {...form}>
          <View className="px-4">
            <Text className="mb-6 text-2xl font-bold">Recipient Info</Text>

            <View className="space-y-4 pb-24">
              <CustomInputField label="recipient Name" name="recipientName" control={control} />

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
