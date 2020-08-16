import React from 'react';
import camelToWords from '../../../../helpers/camelToWords';
import ButtonNew from '../../ButtonNew';
import Icon from '../../Icon';
import * as T from '../../Typography';

const InterviewCol = (colTitle, handleClick) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'buttonCol',
  render: (text, rowData) =>
    rowData && rowData.invitedToInterview ? (
      <Icon icon="circleTick" color="lightBlue" width="20px" height="20px" />
    ) : (
      <>
        <ButtonNew
          type="tertiary"
          bgColor="lightBlue"
          onClick={() => handleClick(rowData)}
          small
          loading={rowData.inviteLoading}
        >
          Invite for interview
        </ButtonNew>
        {rowData.inviteError && (
          <T.PXS color="pink" mt="1">
            {rowData.inviteError}
          </T.PXS>
        )}
      </>
    ),
});

export default InterviewCol;
