import { colors } from '../theme';

export const BOOKING = {
  'awaiting admin': colors.pink,
  'awaiting cancellation': colors.pink,
  'cancelled after payment': colors.pink,
  pending: colors.darkGray,
  accepted: colors.lightBlue,
  confirmed: colors.yellow,
  rejected: colors.pink,
  'rejected by admin': colors.black,
  cancelled: colors.gray,
  completed: colors.blue,
  'looking for host': colors.blue,
  'at host': colors.yellow,
  hosting: colors.yellow,
  'not hosting': colors.gray,
};

export const APPROVAL = {
  'Waiting for approval': colors.primary,
  approved: colors.green,
  rejected: colors.black,
};

export const PAYMENT = {
  upcoming: colors.primary,
  due: colors.secondary,
  paid: colors.gray,
  overdue: colors.pink,
  processing: colors.primary,
};
