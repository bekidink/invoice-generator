import { create } from 'zustand';
import {
  Invoice,
  invoiceInfoFormData,
  ItemData,
  recipientFormData,
  senderFormData,
} from '~/schema/invoice';

export interface InvoiceState {
  newInvoice: Partial<Invoice>;
  addSenderInfo: (senderInfo: senderFormData) => void;
  addRecipient: (recipient: recipientFormData) => void;
  addInvoiceInfo: (invoice: invoiceInfoFormData) => void;
  addItems: (items: ItemData[]) => void;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useStore = create<InvoiceState>((set, get) => ({
  newInvoice: {},
  addSenderInfo: (senderInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, senderInfo } })),
  addRecipient: (recipient) => set((state) => ({ newInvoice: { ...state.newInvoice, recipient } })),
  addInvoiceInfo: (invoice) => set((state) => ({ newInvoice: { ...state.newInvoice, invoice } })),
  addItems: (items) => set((state) => ({ newInvoice: { ...state.newInvoice, items } })),
  getSubtotal: () => {
    const items = get().newInvoice.items || [];
    return items?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
  getTotal: () => {
    const subtotal = get().getSubtotal();
    return subtotal + 100;
  },
}));
