import { z } from 'zod';
export const senderFormSchema = z.object({
  senderName: z.string().min(1, 'Sender Name is required'),
  address: z.string().min(1, 'Address is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
});

export type senderFormData = z.infer<typeof senderFormSchema>;

export const invoiceInfoFormSchema = z.object({
  invoiceNumber: z.string().min(1, 'invoiceInfo Name is required'),
  date: z.string().min(1, 'Date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
});

export type invoiceInfoFormData = z.infer<typeof invoiceInfoFormSchema>;

export const recipientFormSchema = z.object({
  recipientName: z.string().min(1, 'recipient Name is required'),
  address: z.string().min(1, 'Address is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
});

export type recipientFormData = z.infer<typeof recipientFormSchema>;

export const itemsInfoFormSchema = z.object({
  name: z.string().min(1, 'itemsInfo Name is required'),
  quantity: z.number({ required_error: 'Quantity is required' }).min(1, 'Quantity is required'),
  price: z.number({ required_error: 'Quantity is required' }).min(1, 'Quantity is required'),
});

export const itemsSchema = z.object({
  items: itemsInfoFormSchema.array(),
});
export type ItemData = z.infer<typeof itemsInfoFormSchema>;
export type Items = z.infer<typeof itemsSchema>;
export type Invoice = {
  senderInfo: senderFormData;
  recipient:recipientFormData;
  items:ItemData[];
  invoiceInfo:invoiceInfoFormData
};
