import React from 'react';
import * as S from '../style';
import camelToWords from '../../../../helpers/camelToWords';

const processLink = (url, replace, data) => {
  if (replace) {
    return url.replace(`:${replace}`, data[replace]);
  }
  return url;
};

const LinkCol = (colTitle, link, linkReplace) => ({
  title: camelToWords(colTitle),
  dataIndex: colTitle,
  key: colTitle,
  sorter: (a, b) => a[colTitle].localeCompare(b[colTitle]),
  className: 'linkCol',
  render: (text, rowData) => (
    <S.StyledLink to={processLink(link, linkReplace, rowData)}>
      {text}
    </S.StyledLink>
  ),
});

export default LinkCol;
