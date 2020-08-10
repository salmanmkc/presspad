import React from 'react';
import camelToWords from '../../../../helpers/camelToWords';
import ButtonNew from '../../ButtonNew';

const ButtonCol = (colTitle, handleClick, btnType, color) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  className: 'buttonCol',
  render: (text, rowData) => (
    <ButtonNew
      type={btnType || 'primary'}
      bgColor={color}
      onClick={handleClick(rowData)}
      style={{ minWidth: '60px', height: '30px', fontSize: '14px' }}
    >
      Pay
    </ButtonNew>
  ),
});

export default ButtonCol;
