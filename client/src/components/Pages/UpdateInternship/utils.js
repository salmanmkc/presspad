import React from 'react';
import axios from 'axios';

import { API_INTERNSHIP_URL } from '../../../constants/apiRoutes';
import { Modal } from '../../Common/AntdWrappers';
import * as T from '../../Common/Typography';

// eslint-disable-next-line import/prefer-default-export
export const updateInternship = async ({ state }) => {
  try {
    await axios.patch(API_INTERNSHIP_URL, state);
  } catch (error) {
    const status = (error.response && error.response.status) || 500;

    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      'Something went wrong';

    const title =
      status === 422 ? 'Sorry! your data is invalid.' : errorMessage;

    Modal.error({
      title,
      // TODO: add better description
      content: <T.PS>check your internship details again</T.PS>,
      hideOkButton: true,
    });
  }
};
