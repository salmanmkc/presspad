import React from 'react';
import * as S from '../AdminDashboard.style';
import { PXS, PXSBold, H7C } from '../../../Common/Typography';
import { colors } from '../../../../theme';

const ExpandedDetails = ({ record }) => (
  <S.BookingDetails>
    <H7C mb="2">Internship Details</H7C>
    <S.BookingDetailsRow>
      <S.DetailsItem>
        <PXSBold>Organisation</PXSBold>
        <PXS>{record.intern.internship.Organisation}</PXS>
      </S.DetailsItem>
      <S.DetailsItem>
        <PXSBold>Contact Name</PXSBold>
        <PXS>{record.intern.internship['Contact Details'].name}</PXS>
      </S.DetailsItem>
      <S.DetailsItem>
        <PXSBold>Contact Email</PXSBold>
        <a href={`mailto:${record.intern.internship['Contact Details'].email}`}>
          <PXS color={colors.blue}>
            {record.intern.internship['Contact Details'].email}
          </PXS>
        </a>
      </S.DetailsItem>
      <S.DetailsItem>
        <PXSBold>Contact Number</PXSBold>
        <PXS>{record.intern.internship['Contact Details'].phoneNumber}</PXS>
      </S.DetailsItem>
      <S.DetailsItem>
        <PXSBold>Proof of Internship</PXSBold>
        <a href={record.intern.internship['Proof of Internship'].url}>
          <PXS color={colors.blue}>
            {record.intern.internship['Proof of Internship'].fileName}
          </PXS>
        </a>
      </S.DetailsItem>
    </S.BookingDetailsRow>
    <div style={{ display: 'flex' }}>
      <div>
        <H7C mb="2">Host Details</H7C>
        <S.BookingDetailsRow>
          <S.DetailsItem>
            <PXSBold>Email</PXSBold>
            <a href={`mailto:${record.host.email}`}>
              <PXS color={colors.blue}>{record.host.email}</PXS>
            </a>
          </S.DetailsItem>
          <S.DetailsItem>
            <PXSBold>Phone Number</PXSBold>
            <PXS>{record.host.phone}</PXS>
          </S.DetailsItem>
        </S.BookingDetailsRow>
      </div>
      <div>
        <H7C mb="2">Intern Details</H7C>
        <S.BookingDetailsRow>
          <S.DetailsItem>
            <PXSBold>Email</PXSBold>
            <a href={`mailto:${record.intern.email}`}>
              <PXS color={colors.blue}>{record.intern.email}</PXS>
            </a>
          </S.DetailsItem>
          <S.DetailsItem>
            <PXSBold>Phone Number</PXSBold>
            <PXS>{record.intern.phone}</PXS>
          </S.DetailsItem>
        </S.BookingDetailsRow>
      </div>
    </div>
  </S.BookingDetails>
);

export default ExpandedDetails;
