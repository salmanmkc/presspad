import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './style';
import * as T from '../../../../Common/Typography';
import { Row, Col } from '../../../../Common/Grid';
import ButtonNew from '../../../../Common/ButtonNew';
import Figure from '../../../../Common/Figure';
import formatPrice from '../../../../../helpers/formatPrice';

import { ADMIN_BURSARY } from '../../../../../constants/navRoutes';

// dummy data to be  replaced when back end connected
const dummyData = {
  bursaryBalance: 100,
};

const Success = () => {
  const [availableBalance, setAvailableBalance] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const { bursaryBalance } = dummyData;
    setAvailableBalance(bursaryBalance);
  }, []);

  return (
    <Row>
      <Col w={[4, 8, 8]}>
        <Row mb={5}>
          <Col w={[4, 12, 12]}>
            <T.H2 color="blue">Success!</T.H2>
          </Col>
        </Row>
        <Row mb={4}>
          <Col w={[4, 12, 12]}>
            <T.P color="gray3" mb={4}>
              You have successfully granted another PressPad Bursary!
            </T.P>
            <Figure
              stats={formatPrice(availableBalance)}
              title="remaining balance"
              small
            />
          </Col>
        </Row>
        <Row>
          <Col w={[4, 6, 6]}>
            <ButtonNew
              type="secondary"
              onClick={() => history.push(ADMIN_BURSARY)}
            >
              Return to bursaries
            </ButtonNew>
          </Col>
        </Row>
      </Col>
      <S.PinkDiv w={[0, 4, 4]} />
    </Row>
  );
};

export default Success;
