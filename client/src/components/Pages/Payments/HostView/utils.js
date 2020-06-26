import moment from 'moment';

import { getFirstUnpaidInstallment } from '../../BookingView/helpers';

// eslint-disable-next-line import/prefer-default-export
export const reformatPaymentsHistory = paymentsHistory => {
  if (Array.isArray(paymentsHistory)) {
    return paymentsHistory.map(payment => {
      let paymentStatus;
      let formattedInstallments;

      if (!payment.installments) {
        paymentStatus = 'paid';
      } else if (!payment.installments[0]) {
        paymentStatus = 'paid';
      } else {
        let paidInstallmentsNum = 0;
        formattedInstallments = payment.installments.map(installment => {
          let status;
          if (installment.transaction) {
            status = 'paid';
            paidInstallmentsNum += 1;
          } else if (moment(installment.dueDate).isBefore(moment())) {
            status = 'overdue';
          } else if (moment(installment.dueDate).isSame(moment())) {
            status = 'payment due';
          } else {
            status = 'upcoming';
          }
          return { ...installment, status };
        });

        if (paidInstallmentsNum === formattedInstallments.length) {
          // all paid
          paymentStatus = 'paid';
        } else if (paidInstallmentsNum === 0) {
          // all not paid
          const { status } = getFirstUnpaidInstallment(formattedInstallments);
          paymentStatus = status;
        } else {
          // some paid
          const { status } = getFirstUnpaidInstallment(formattedInstallments);
          paymentStatus = status;
        }
      }

      return { ...payment, paymentStatus, formattedInstallments };
    });
  }
  return null;
};
