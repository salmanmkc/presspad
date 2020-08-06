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
};

export const APPROVAL = {
  'Waiting for approval': colors.primary,
  approved: colors.green,
  rejected: colors.black,
};
