import React from 'react';
import Highlighter from 'react-highlight-words';
import * as S from '../style';
import * as T from '../../Typography';
import { colors } from '../../../../theme';
import camelToWords from '../../../../helpers/camelToWords';

import { ADMIN_USER_DETAILS } from '../../../../constants/navRoutes';
// userTypes = host, intern, org

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
