import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { message } from 'antd';
import * as S from '../style';
import * as T from '../../Typography';
import SingleUpdate from './SingleUpdate';

import { Row, Col } from '../../Grid';

import { API_NOTIFICATION_URL } from '../../../../constants/apiRoutes';

const Updates = ({ updates = [], userRole }) => {
  const [slicedUpdates, setSlicedUpdates] = useState([]);
  const [viewUpdateNum, setViewUpdateNum] = useState(3);
  const [seen, setMarkAsSeen] = useState(false);

  // updates db field seen / seenForOrg of notification on mouse hover / click
  const markAsSeen = async () => {
    if (!seen) {
      try {
        const newUpdates = slicedUpdates.map(ele => ({ ...ele }));
        const updateIds = slicedUpdates.reduce((acc, curr, i) => {
          if (userRole === 'org' ? !curr.seenForgOrg : !curr.seen) {
            acc.push(curr._id);
            newUpdates[i].loading = true;
          }
          return acc;
        }, []);

        setMarkAsSeen(true);
        setSlicedUpdates(newUpdates);

        if (updateIds[0]) {
          await axios.patch(`${API_NOTIFICATION_URL}/seen`, updateIds);

          const updatedUpdates = updates.map(update => {
            if (updateIds.includes(update._id)) {
              return {
                ...update,
                [userRole === 'org' ? 'seenForOrg' : 'seen']: true,
                loading: false,
              };
            }
            return update;
          });

          setSlicedUpdates(updatedUpdates.slice(0, viewUpdateNum));
        }
      } catch (error) {
        setMarkAsSeen(false);
        message.error('Something went wrong');
      }
    }
  };

  const handleViewMoreToggle = () => {
    if (viewUpdateNum < updates.length) {
      setMarkAsSeen(false);
      return setViewUpdateNum(viewUpdateNum + 3);
    }

    if (viewUpdateNum >= updates.length && viewUpdateNum > 3)
      return setViewUpdateNum(3);

    return null;
  };

  useEffect(() => {
    const sortUpdates = updates.sort((a, b) => {
      if (moment(a.createdAt).isAfter(b.createdAt)) {
        return -1;
      }
      return 1;
    });

    setSlicedUpdates(sortUpdates.slice(0, viewUpdateNum));
  }, [updates, viewUpdateNum]);

  return (
    <S.Wrapper onMouseEnter={markAsSeen} onTouchStart={markAsSeen}>
      <Row mb={4}>
        <Col w={[4, 12, 12]}>
          <S.Title>Updates</S.Title>
        </Col>
      </Row>
      {slicedUpdates && slicedUpdates.length > 0 ? (
        slicedUpdates.map(item => (
          <SingleUpdate item={item} key={item._id} userRole={userRole} />
        ))
      ) : (
        <Row>
          <Col w={[4, 12, 12]}>
            <T.P>No updates to show</T.P>
          </Col>
        </Row>
      )}
      <Row>
        <Col w={[4, 12, 12]}>
          {viewUpdateNum >= updates.length && viewUpdateNum > 3 && (
            <S.StyledBtn
              onClick={handleViewMoreToggle}
              style={{ marginTop: '2rem', marginLeft: 0 }}
            >
              <T.PXS color="pink">View less</T.PXS>
            </S.StyledBtn>
          )}
          {updates.length > viewUpdateNum && (
            <S.StyledBtn
              onClick={handleViewMoreToggle}
              style={{ marginTop: '2rem', marginLeft: 0 }}
            >
              <T.PXS color="pink">View more</T.PXS>
            </S.StyledBtn>
          )}
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default Updates;
