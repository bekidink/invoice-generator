import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Sender' }} />
      <Stack.Screen name="recipient" options={{ title: 'Recipient' }} />
      <Stack.Screen name="invoice-info" options={{ title: 'Invoice Info' }} />
      <Stack.Screen name="items" options={{ title: 'Items' }} />
      <Stack.Screen name="summary" options={{ title: 'Summary' }} />
    </Stack>
  );
}
