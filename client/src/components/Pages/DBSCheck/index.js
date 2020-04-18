import React, { useState } from 'react';
import { withWindowWidth } from '../../../HOCs';
import * as S from './style';
import Logo from '../../../assets/presspad-logo.png';

import Page1 from './Page1';
import Page2 from './Page2';

const DBSCheckPage = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <S.Header>
        <S.Logo src={Logo} alt="logo" />
      </S.Header>
      {page === 1 && <Page1 setPage={setPage} />}
      {page === 2 && <Page2 />}
    </>
  );
};

export default withWindowWidth(DBSCheckPage, true);
