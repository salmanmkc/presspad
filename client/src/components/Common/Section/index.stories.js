import React from 'react';
import moment from 'moment';
import {
  Updates,
  Wallet,
  Community,
  Reviews,
  Badges,
  MyAccount,
  AccountDetails,
  InternshipDetails,
  MyImpact,
  Payments,
} from './index';
import * as T from '../Typography';
import { Row, Col } from '../Grid';

export default {
  title: 'Sections',
};

export const UpdatesSection = () => {
  const data = [
    {
      type: 'stayRejected',
      secondParty: {
        name: 'Joe Friel',
        _id: '1',
      },
      createdAt: new Date(),
    },
    {
      type: 'stayRejected',
      secondParty: {
        name: 'Joe Friel',
        _id: '1',
      },
      createdAt: new Date(),
    },
    {
      type: 'stayRejected',
      secondParty: {
        name: 'Joe Friel',
        _id: '1',
      },
      createdAt: new Date(),
    },
    {
      type: 'stayRejected',
      secondParty: {
        name: 'Joe Friel',
        _id: '1',
      },
      createdAt: new Date(),
    },
    {
      type: 'stayRejected',
      secondParty: {
        name: 'Joe Friel',
        _id: '1',
      },
      createdAt: new Date(),
    },
    {
      type: 'stayRejected',
      secondParty: {
        name: 'Joe Friel',
        _id: '1',
      },
      createdAt: new Date(),
    },
    {
      type: 'stayRejected',
      secondParty: {
        name: 'Joe Friel',
        _id: '1',
      },
      createdAt: new Date(),
    },
  ];

  return (
    <>
      <div style={{ padding: '20px' }}>
        <Row>
          <Col w={[4, 4, 4]}>
            <Updates updates={data} userRole="intern" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export const WalletSection = () => (
  <Row>
    <Col w={[4, 4, 4]}>
      <Wallet balance={200} pending={50} />
    </Col>
  </Row>
);

export const CommunitySection = () => (
  <Row>
    <Col w={[4, 6, 6]}>
      <Community />
    </Col>
  </Row>
);

export const ReviewSection = () => {
  const reviews = [
    {
      firstName: 'Alan',
      subtitle: 'political investigator',
      rating: 1,
      text:
        'Staying here was an absolute pleasure. I learned a great deal about how to approach politicians and very much enjoyed the city. We managed to go to a few journalistic events as well and met some amazing people!',
    },

    {
      firstName: 'Linda',
      rating: 3,
      text:
        'Staying here was an absolute pleasure. I learned a great deal about how to approach politicians and very much enjoyed the city. We managed to go to a few journalistic events as well and met some amazing people!',
    },
  ];

  return (
    <Row>
      <Col w={[4, 6, 6]}>
        <Reviews reviews={reviews} />
      </Col>
    </Row>
  );
};

export const BadgeSection = () => (
  <Row>
    <Col w={[4, 6, 6]}>
      <Badges ambassador community />
    </Col>
  </Row>
);

export const MyAccountSection = () => {
  const addFunds = () => console.log('Function to add funds to account');
  const addCodes = () => console.log('Function to add codes to account');

  return (
    <Row>
      <Col w={[4, 4, 4]}>
        <MyAccount
          funds={4400}
          liveCodes={3}
          liveCodesCost={600}
          liveBookings={1}
          addFunds={addFunds}
          addCodes={addCodes}
        />
      </Col>
    </Row>
  );
};

export const AccountDetailsSection = () => (
  <Row>
    <Col w={[4, 4, 4]}>
      <AccountDetails
        firstName="Abbie"
        lastName="Harper"
        email="abbie@test.com"
        phone="078328828882"
      />
    </Col>
  </Row>
);

export const InternshipDetailsSection = () => {
  const data = ['Internship Scheme A 2020', 'Ongoing Creative Industry Scheme'];

  return (
    <Row>
      <Col w={[4, 4, 4]}>
        <InternshipDetails internOpps={data} />
      </Col>
    </Row>
  );
};

export const MyImpactSection = () => (
  <Row>
    <Col w={[4, 7, 7]}>
      <MyImpact totalInterns={42} totalPaid={1500} />
    </Col>
  </Row>
);

export const RecentPayments = () => {
  const data = [
    {
      date: moment(),
      intern: 'John Harper',
      earnings: 400.5,
    },
  ];

  return (
    <Row>
      <Col w={[4, 6, 6]}>
        <Payments type="recent" payments={data} />
      </Col>
    </Row>
  );
};
