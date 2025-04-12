import { View, Text } from 'react-native';
import KeyboardAwareScrollView from '~/components/KeyboardAwarScrollView';
import CustomInputField from '~/components/CustomInputField';
import CustomButton from '~/components/CustomButton';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { invoiceInfoFormData, invoiceInfoFormSchema } from '~/schema/invoice';
import { useStore } from '~/store/store';

const InvoiceGenerator = () => {
  const form = useForm<invoiceInfoFormData>({
    resolver: zodResolver(invoiceInfoFormSchema),
    defaultValues: {
      invoiceNumber: 'kobeki',
      date: new Date().toISOString(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(),
    },
  });
  const { control, handleSubmit } = form;
const addInvoiceInfo = useStore((data) => data.addInvoiceInfo);
  const onSubmit = (data: any) => {
    addInvoiceInfo(data)
    router.push('/invoice/generate/summary');
  };
  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <FormProvider {...form}>
          <View className="px-4">
            <Text className="mb-6 text-2xl font-bold">Invoice Info</Text>

            <View className="space-y-4 pb-24">
              <CustomInputField label="Invoice Name" name="invoiceNumber" />

              <CustomInputField label="Date" name="date" />

              <CustomInputField label="Due Date" name="dueDate" />
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
