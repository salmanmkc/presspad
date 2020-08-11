import React from 'react';
import camelToWords from '../../../../helpers/camelToWords';
import ButtonNew from '../../ButtonNew';
import Icon from '../../Icon';

const InterviewCol = (colTitle, handleClick) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'buttonCol',
  render: (text, rowData) =>
    rowData && rowData.invitedToInterview ? (
      <Icon icon="circleTick" color="lightBlue" width="20px" height="20px" />
    ) : (
      <ButtonNew
        type="tertiary"
        bgColor="lightBlue"
        onClick={handleClick(rowData)}
        small
      >
        Invite for interview
      </ButtonNew>
    ),
});

export default InterviewCol;
