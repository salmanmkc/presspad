import React, { useState } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

import { columns, createDataSource } from './config.PaymentsTable';
import validateBankDetails from './paymentsSchema';

import { PXSBold } from '../../Common/Typography';

import { API_ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL } from '../../../constants/apiRoutes';

const PaymentsTable = ({
  data,
  highlightVal,
  handleConfirm,
  loading,
  selectSection,
}) => {
  const dataSource = loading ? [] : createDataSource(data);

  const [bankDetails, setBankDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  const onInputChange = e => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  const onBlur = requestId => {
    const {
      bankName = '',
      bankSortCode = '',
      accountNumber = '',
    } = bankDetails;

    if (!requestId) {
      return message.error('missing Id');
    }

    if (
      bankName.length > 0 ||
      bankSortCode.length > 0 ||
      accountNumber.length > 0
    ) {
      validateBankDetails()
        .validate(bankDetails, { abortEarly: false })
        .then(async () => {
          setErrors({});
          setUpdateLoading(true);
          await axios.patch(API_ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL, {
            requestId,
            bankDetails,
          });
          setUpdateLoading(false);
          message.success('updated!');
          selectSection('payments');
        })
        .catch(err => {
          if (err.name === 'ValidationError') {
            const _errors = {};
            err.inner.forEach(element => {
              _errors[element.path.split('.')[0]] = element.message;
            });
            setErrors({ ...errors, ..._errors });
          }
        });
    } else {
      return null;
    }
  };

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns(
          highlightVal,
          handleConfirm,
          onInputChange,
          onBlur,
          updateLoading,
        )}
        loading={loading}
      />
      {errors &&
        Object.values(errors).length > 0 &&
        Object.values(errors).map(err => <PXSBold color="pink">{err}</PXSBold>)}
    </>
  );
};

export default PaymentsTable;
