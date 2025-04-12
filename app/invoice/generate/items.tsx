import { View, Text } from 'react-native';

import KeyboardAwareScrollView from '~/components/KeyboardAwarScrollView';
import CustomInputField from '~/components/CustomInputField';
import CustomButton from '~/components/CustomButton';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Items, itemsSchema } from '~/schema/invoice';
import { useStore } from '~/store/store';

const itemsGenerator = () => {
  const form = useForm<Items>({
    resolver: zodResolver(itemsSchema),
    defaultValues: {
      items: [
        {
          name: 'kobeki',
          quantity: 0,
          price: 0,
        },
      ],
    },
  });
  const { handleSubmit } = form;
  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'items',
  });
  const addItems = useStore((data) => data.addItems);
  const onSubmit = (data: any) => {
    addItems(data);
    router.push('/invoice/generate/summary');
  };
  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <FormProvider {...form}>
          <View className="px-4">
            <Text className="mb-6 text-2xl font-bold">Items Info</Text>
            <View className="gap-3 shadow">
              {form.getValues().items.map((_, index) => (
                <View key={index} className="space-y-4 rounded-lg pb-6 ">
                  <CustomInputField label={`Item ${index + 1} `} name={`${index}.name`} />
                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <CustomInputField
                        label="Quantity"
                        name={`${index}.quantity`}
                        keyboardType="numeric"
                      />
                    </View>
                    <View className="flex-1">
                      <CustomInputField
                        label="Price"
                        name={`${index}.price`}
                        keyboardType="numeric"
                      />
                    </View>{' '}
                    <View className="flex-1">
                      <Text className="mb-1 text-gray-600">Total</Text>
                      <Text className="w-full rounded-md border border-gray-300 p-2">
                        {form.watch(`items.${index}.quantity`) * form.watch(`items.${index}.price`)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View className="pb-24">
              <CustomButton
                title="Add Item"
                variant="link"
                onPress={() => append({ name: '', quantity: 1, price: 0 })}
              />
            </View>
          </View>

          <View className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <CustomButton title="Generate items" onPress={handleSubmit(onSubmit)} />
          </View>
        </FormProvider>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default itemsGenerator;
