import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAwareScrollView from '~/components/KeyboardAwarScrollView';
import CustomInputField from '~/components/CustomInputField';
import CustomButton from '~/components/CustomButton';

const InvoiceGenerator = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    taxid: '',
    amount: '',
    description: '',
  });

  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <View className="px-4">
          <Text className="mb-6 text-2xl font-bold">Sender Info</Text>

          <View className="space-y-4 pb-24">
            <CustomInputField
              label="Sender Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter your name"
            />
            <CustomInputField
              label="Address"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholder="Enter your address"
              multiline
            />

            <CustomInputField
              label="Tax ID"
              value={formData.taxid}
              onChangeText={(text) => setFormData({ ...formData, taxid: text })}
              placeholder="Enter your tax ID"
              keyboardType="email-address"
            />

            <CustomInputField
              label="Amount"
              value={formData.amount}
              onChangeText={(text) => setFormData({ ...formData, amount: text })}
              placeholder="Enter amount"
              keyboardType="numeric"
            />

            <CustomInputField
              label="Description"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Enter description"
              multiline
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-4 pb-4">
        <CustomButton
          title="Generate Invoice"
          onPress={() => {
            console.log(formData);
          }}
        />
      </View>
    </View>
  );
};

export default InvoiceGenerator;
