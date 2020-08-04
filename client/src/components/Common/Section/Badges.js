import React, { useState } from 'react';
import { text } from 'body-parser';
import * as S from './style';
import * as T from '../Typography';
import Icon from '../Icon';
import { colors } from '../../../theme';

import { Row, Col } from '../Grid';

const ambassadorText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut';

const communityText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut';

const Badges = ({ ambassador, community }) => {
  const [textToShow, setTextToShow] = useState({ type: null, text: '' });

  const showText = type => {
    switch (type) {
      case textToShow.type:
        setTextToShow({ type: null, text: '' });
        break;
      case 'ambassador':
        setTextToShow({ type, text: ambassadorText });
        break;
      case 'community':
        setTextToShow({ type, text: communityText });
        break;
      default:
        setTextToShow({ type: null, text: '' });
    }
  };

  return (
    <>
      <Row mb={5}>
        <Col w={[4, 8, 8]} style={{ backgroundColor: colors.lightestGray }}>
          <S.Title mt={2} mb={2}>
            Badges
          </S.Title>
        </Col>
      </Row>
      <Row>
        {ambassador && (
          <Col w={[4, 12, 6]} style={{ marginBottom: '20px' }}>
            <Icon
              icon="ambassador"
              width="auto"
              height="100px"
              color="secondary"
            />
            <S.Title light color="darkBlue">
              PressPad
            </S.Title>
            <S.WithIcon>
              <S.Title color="darkBlue">Ambassador</S.Title>
              <S.StyledBtn onClick={() => showText('ambassador')}>
                <Icon
                  icon="questionCircle"
                  color="darkBlue"
                  width="30px"
                  height="30px"
                />
              </S.StyledBtn>
            </S.WithIcon>
            {textToShow && textToShow.type === 'ambassador' && (
              <T.PXS color="blue" mt={1}>
                {textToShow.text}
              </T.PXS>
            )}
          </Col>
        )}
        {community && (
          <Col w={[4, 12, 6]}>
            <Icon icon="community" width="auto" height="100px" color="pink" />
            <S.Title light color="darkBlue">
              Community
            </S.Title>
            <S.WithIcon>
              <S.Title color="darkBlue">Recommended</S.Title>
              <S.StyledBtn onClick={() => showText('community')}>
                <Icon
                  icon="questionCircle"
                  color="darkBlue"
                  width="30px"
                  height="30px"
                />
              </S.StyledBtn>
            </S.WithIcon>
            {textToShow && textToShow.type === 'community' && (
              <T.PXS color="blue" mt={1}>
                {textToShow.text}
              </T.PXS>
            )}
          </Col>
        )}
      </Row>
    </>
  );
};

export default Badges;
