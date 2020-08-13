import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import * as S from './style';
import * as T from '../../../../Common/Typography';
import { Row, Col } from '../../../../Common/Grid';
import ButtonNew from '../../../../Common/ButtonNew';
import Figure from '../../../../Common/Figure';
import LoadingBallPulseSync from '../../../../Common/LoadingBallPulseSync';
import { formatPrice } from '../../../../../helpers';

import { ADMIN_BURSARY } from '../../../../../constants/navRoutes';
import { API_UPDATE_BURSARY_APPLICATIONS } from '../../../../../constants/apiRoutes';

const Success = () => {
  const [loading, setLoading] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(0);

  const history = useHistory();
  const { id: applicationId } = useParams();

  useEffect(() => {
    let mounted = true;
    async function getBursaryApplicationInfo() {
      setLoading(true);
      const { data: _data } = await axios.get(
        API_UPDATE_BURSARY_APPLICATIONS.replace(':id', applicationId),
      );

      if (mounted) {
        const { bursaryFunds } = _data;
        setAvailableBalance(bursaryFunds);
        setLoading(false);
      }
    }

    getBursaryApplicationInfo();
    return () => {
      mounted = false;
    };
  }, [applicationId]);

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
              stats={
                loading ? (
                  <LoadingBallPulseSync />
                ) : (
                  formatPrice(availableBalance)
                )
              }
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
