import { HttpErrorResponse } from '@angular/common/http';

export interface Account {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  cardInfo: string;
  bankInfo: string;
  paymentReminder: boolean;
  paymentCompleted: boolean;
  paymentFailed: boolean;
  paymentRescheduled: boolean;
  newsPurchase: boolean;
  orderDenied: boolean;
  orderCompleted: boolean;
  accountChanges: boolean;
}

export interface PaymentSetting {
  paymentMethod: string;
}

export interface PaymentCard {
  card: string;
  cardNumber: string;
  month: string;
  year: string;
  cvv: string;
  zipcode: string;
}

export interface Label {
  key: string;
  value: string;
}

export interface Notification {
  key: string;
  value: string;
}

export interface AccountState {
  loading: boolean;
  accounts?: Account[];
  labels?: Label[];
  notifications?: Notification[];
  selectedMethod: string;
  errors?: HttpErrorResponse[];
}

export enum PaymentMethods {
  BANK = 'bank',
  CARD = 'card'
}

export enum PaymentDialog {
  CARD_DIALOG = 'card_dialog',
  BANK_DIALOG = 'bank_dialog',
  CHANGE_DEFAULT_DIALOG = 'change_default_dialog'
}