import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import * as S from './style';
import * as T from '../../../../Common/Typography';
import { Row, Col } from '../../../../Common/Grid';
import { Input, Checkbox, Select } from '../../../../Common/Inputs';
import ButtonNew from '../../../../Common/ButtonNew';
import Figure from '../../../../Common/Figure';
import Icon from '../../../../Common/Icon';
import { formatPrice } from '../../../../../helpers';
import LoadingBallPulseSync from '../../../../Common/LoadingBallPulseSync';
import Notification from '../../../../Common/Notification';

import bursaryOptions from '../../../../../constants/bursaryOptions';
import { ADMIN_BURSARY_SUCCESS } from '../../../../../constants/navRoutes';
import { API_UPDATE_BURSARY_APPLICATIONS } from '../../../../../constants/apiRoutes';

const Approve = () => {
  const [londonWeighting, setLondonWeighting] = useState(false);
  const [message, setMessage] = useState('');
  const [availableBalance, setAvailableBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bursaryPerc, setBursaryPerc] = useState(0);
  const [totalPotentialCost, setTotalPotentialCost] = useState(0);
  const [maxLimit, setMaxLimit] = useState(840);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [responseComplete, setResponseComplete] = useState(false);
  const [error, setError] = useState('');

  const { id: applicationId } = useParams();

  const calcCost = () => {
    let total = totalPotentialCost * bursaryPerc;

    if (londonWeighting) {
      const londonCost = total * 0.2;
      if (londonCost > 16800) {
        total += 16800;
      } else {
        total += londonCost;
      }
    }
    return total > maxLimit * 100 ? maxLimit * 100 : total;
  };

  const canSubmit = () => {
    const totalCost = calcCost();
    return bursaryPerc > 0 && totalCost <= availableBalance;
  };

  const notEnoughFunds = () => {
    const total = calcCost();
    return total > availableBalance;
  };

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      await axios.patch(
        API_UPDATE_BURSARY_APPLICATIONS.replace(':id', applicationId),
        {
          status: 'approved',
          adminMessage: message,
          londonWeighting,
          bursaryPerc: bursaryPerc * 100,
          maxLimit: maxLimit * 100,
          awardedBursary: calcCost(),
        },
      );
      setResponseComplete(true);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      }
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    async function getBursaryApplicationInfo() {
      setLoading(true);
      const { data: _data } = await axios.get(
        API_UPDATE_BURSARY_APPLICATIONS.replace(':id', applicationId),
      );

      if (mounted) {
        const { bursaryFunds, internshipEndDate, internshipStartDate } = _data;
        setAvailableBalance(bursaryFunds);

        const internshipLength =
          moment(internshipEndDate)
            .endOf('d')
            .diff(internshipStartDate, 'd') + 1;

        // we add 6 days because an intern is allowed to stay up to 3 days prior and 3 days after after their internship so this would need to be factored in
        // we minus 14 days because first 2 weeks are free
        setTotalPotentialCost((internshipLength + 6 - 14) * 2000);
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
            <T.H2 color="blue">Approve bursary</T.H2>
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 8, 8]}>
            <Figure
              stats={
                loading ? (
                  <LoadingBallPulseSync />
                ) : (
                  formatPrice(availableBalance)
                )
              }
              title="available balance"
              small
            />
            <Select
              options={bursaryOptions}
              placeholder="%"
              label="Bursary %"
              onChange={e => setBursaryPerc(e)}
              value={bursaryPerc}
              mb={4}
              mt={4}
            />
            <Input
              label="Max limit"
              value={maxLimit}
              onChange={e => setMaxLimit(e.target.value)}
              type="number"
              addonBefore="£"
            />
          </Col>
        </Row>
        <Row mb={4}>
          <Col w={[4, 10, 10]}>
            <Checkbox
              label="Apply additional 20% London weighting (up to £168)"
              checked={londonWeighting}
              onChange={() => setLondonWeighting(!londonWeighting)}
            />
          </Col>
        </Row>
        <Row mb={6}>
          <Col w={[4, 8, 8]}>
            <Input
              textArea
              onChange={e => setMessage(e.target.value)}
              value={message}
              label="Send an optional message"
            />
          </Col>
        </Row>
        <Row mb={6}>
          <Col w={[4, 3, 3]}>
            <Figure
              stats={formatPrice(totalPotentialCost)}
              title="cost of internship"
              small
            />
          </Col>
          {bursaryPerc > 0 && (
            <Col w={[4, 3, 3]}>
              <Figure
                stats={formatPrice(calcCost())}
                title="bursary award"
                small
              />
            </Col>
          )}
          {notEnoughFunds() && (
            <S.Warning w={[4, 3, 3]}>
              <Icon
                color="pink"
                icon="warning"
                width="30"
                height="30"
                margin="0 5px 0 0"
              />
              <T.H8C caps color="blue" style={{ display: 'inline-flex' }}>
                Not enough money in the fund
              </T.H8C>
            </S.Warning>
          )}
        </Row>
        <Row>
          <Col w={[4, 6, 6]}>
            <ButtonNew
              label="submit"
              type="secondary"
              onClick={handleSubmit}
              disabled={!canSubmit()}
              loading={submitLoading}
            >
              Submit
            </ButtonNew>
            {error && (
              <T.PXS color="pink" mt="2">
                {error}
              </T.PXS>
            )}
          </Col>
        </Row>
      </Col>
      <S.PinkDiv w={[0, 4, 4]} />
      <Notification
        open={responseComplete}
        setOpen={setResponseComplete}
        content="Response completed"
        redirectUrl={ADMIN_BURSARY_SUCCESS.replace(':id', applicationId)}
      />
    </Row>
  );
};

export default Approve;
