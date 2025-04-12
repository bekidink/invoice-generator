import { View, Text } from 'react-native';
import KeyboardAwareScrollView from '~/components/KeyboardAwarScrollView';
import CustomButton from '~/components/CustomButton';
import { router } from 'expo-router';
import { useStore } from '~/store/store';
import { generatePdf } from '~/utils/pdf';

const InvoiceSummary = () => {
  const newInvoice = useStore((data) => data.newInvoice);
  const subtotal = useStore((data) => data.getSubtotal);
  const total = useStore((data) => data.getTotal);
  return (
    <View className="flex-1">
      <KeyboardAwareScrollView>
        <View className="px-4">
          <Text className="mb-6 text-2xl font-bold">Invoice Summary</Text>

          {/* Sender Info Card */}
          {newInvoice.senderInfo && (
            <>
              <Text className="mb-2 text-lg font-semibold">Sender Information</Text>

              <View className="mb-6 rounded-lg border border-gray-200 p-4">
                <View className="space-y-2">
                  <Text className="capitalize">Name: {newInvoice?.senderInfo?.senderName}</Text>
                  <Text>Address: {newInvoice?.senderInfo?.address}</Text>
                  <Text>Tax ID: {newInvoice?.senderInfo?.taxId}</Text>
                </View>
              </View>
            </>
          )}

          {/* Recipient Info Card */}
          {newInvoice.recipient && (
            <>
              <Text className="mb-2 text-lg font-semibold">Recipient Information</Text>

              <View className="mb-6 rounded-lg border border-gray-200 p-4">
                <View className="space-y-2">
                  <Text className="capitalize">Name: {newInvoice.recipient.recipientName}</Text>
                  <Text className="capitalize">Address: {newInvoice.recipient.address}</Text>
                  <Text className="capitalize">Tax ID: {newInvoice.recipient.taxId}</Text>
                </View>
              </View>
            </>
          )}

          {/* Invoice Details Card */}
          {newInvoice.invoiceInfo && (
            <>
              <Text className="mb-2 text-lg font-semibold">Invoice Details</Text>

              <View className="mb-6 rounded-lg border border-gray-200 p-4">
                <View className="space-y-2">
                  <Text>Invoice Number: {newInvoice.invoiceInfo.invoiceNumber}</Text>
                  <Text>Date: {newInvoice.invoiceInfo.date}</Text>
                  <Text>Due Date: {newInvoice.invoiceInfo.dueDate}</Text>
                </View>
              </View>
            </>
          )}

          {/* Items Card */}
          <View className="mb-6 rounded-lg border border-gray-200 p-4">
            <Text className="mb-2 text-lg font-semibold">Items</Text>
            <View className="space-y-4">
              {/* Item Headers */}
              <View className="flex-row justify-between">
                <Text className="flex-1 font-medium">Item</Text>
                <Text className="w-20 text-right font-medium">Qty</Text>
                <Text className="w-20 text-right font-medium">Price</Text>
                <Text className="w-24 text-right font-medium">Total</Text>
              </View>
              {newInvoice.items?.map((item, i) => (
                <View className="flex-row justify-between">
                  <Text className="flex-1">{item.name}</Text>
                  <Text className="w-20 text-right">{item.quantity}</Text>
                  <Text className="w-20 text-right">{item.price}</Text>
                  <Text className="w-24 text-right">{item.quantity * item.price}</Text>
                </View>
              ))}
              {/* Item Rows */}
            </View>
          </View>

          {/* Totals Card */}
          <View className="mb-24 rounded-lg border border-gray-200 p-4">
            <Text className="mb-2 text-lg font-semibold">Totals</Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text>Subtotal</Text>
                <Text>${subtotal()}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Tax (15%)</Text>
                <Text>$26.25</Text>
              </View>
              <View className="flex-row justify-between border-t border-gray-200 pt-2">
                <Text className="font-semibold">Total</Text>
                <Text className="font-semibold">{total()}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <CustomButton title="Generate PDF" onPress={() => {
            generatePdf()
          }} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default InvoiceSummary;
