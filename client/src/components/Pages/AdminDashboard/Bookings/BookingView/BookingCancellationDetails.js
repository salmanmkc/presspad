import React from 'react';
import moment from 'moment';
import * as S from './style';
import { PS, PXS, PXSBold, H7C } from '../../../../Common/Typography';

import FileDownload from '../../../../Common/Files/FileDownload';

import { formatPrice } from '../../../../../helpers';

const detailsStyles = {
  headline: {
    marginBottom: '0.5rem',
  },
};

const BookingCancellationDetails = ({ details }) => {
  const {
    cancellationDetails = {},
    host = {},
    intern = {},
    startDate = '',
    endDate = '',
    payedAmount = '',
    price = '',
    coupon = {},
  } = details;
  const { internship } = intern;

  const cancellingUserDetails =
    cancellationDetails && cancellationDetails.cancelledBy === intern._id
      ? { name: intern.name, role: 'intern' }
      : { name: host.name, role: 'host' };

  return (
    <>
      <S.ReviewWrapper>
        <S.Row mt="-0.2rem">
          <H7C style={detailsStyles.headline} color="lightBlue">
            cancel requested by
          </H7C>
          <PS>
            {cancellingUserDetails.name} ({cancellingUserDetails.role})
          </PS>
        </S.Row>

        <S.Row>
          <H7C style={detailsStyles.headline} color="lightBlue">
            reason provided
          </H7C>
          <PS>{cancellationDetails.cancellingUserMessage}</PS>
        </S.Row>

        {/* BOOKING DETAILS */}
        <S.Row>
          <H7C style={detailsStyles.headline} color="lightBlue">
            booking details
          </H7C>
          <S.SubRow>
            <S.Column>
              <PXSBold>Start Date of Stay</PXSBold>
              <PXS>{moment(startDate).format('DD/MM/YYYY')}</PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Length of Stay</PXSBold>
              <PXS>{moment(endDate).diff(moment(startDate), 'days')} days</PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Paid by Organisation</PXSBold>
              {coupon && coupon.discountRate ? (
                <PXS>
                  {coupon.discountRate}% ({coupon.Organisation})
                </PXS>
              ) : (
                'N/A'
              )}
            </S.Column>
            <S.Column>
              <PXSBold>Paid so far</PXSBold>
              <PXS>{formatPrice(payedAmount)}</PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Total cost</PXSBold>
              <PXS>{formatPrice(price)}</PXS>
            </S.Column>
          </S.SubRow>
        </S.Row>

        {/* INTERNSHIP DETAILS */}
        <S.Row>
          <H7C style={detailsStyles.headline} color="lightBlue">
            internship details
          </H7C>
          <S.SubRow>
            <S.Column>
              <PXSBold>Organisation</PXSBold>
              <PXS>{internship.Organisation}</PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Contact Name</PXSBold>
              <PXS>{internship['Contact Details'].name}</PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Contact Email</PXSBold>
              <PXS>
                {' '}
                <a
                  href={`mailto:${internship['Contact Details'].email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {internship['Contact Details'].email}
                </a>
              </PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Contact Number</PXSBold>
              <PXS>{internship['Contact Details'].phoneNumber}</PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Proof of Internship</PXSBold>
              <PXS style={{ textDecoration: 'underline' }}>
                {internship['Proof of Internship'].fileName ? (
                  <FileDownload
                    style={{
                      marginBottom: '10px',
                      border: '1px red solid',
                    }}
                    url={internship['Proof of Internship'].fileName}
                    fileName="Click to download"
                  />
                ) : (
                  <PXS>Missing file</PXS>
                )}
              </PXS>
            </S.Column>
          </S.SubRow>
        </S.Row>

        {/* HOST DETAILS */}
        <S.Row>
          <H7C style={detailsStyles.headline} color="lightBlue">
            host details
          </H7C>
          <S.SubRow>
            <S.Column>
              <PXSBold>Name</PXSBold>
              <PXS>{host.name}</PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Contact Email</PXSBold>
              <PXS>
                <a
                  href={`mailto:${host.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {host.email}
                </a>
              </PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Contact Number</PXSBold>
              <PXS>{host.phone}</PXS>
            </S.Column>
          </S.SubRow>
        </S.Row>

        {/* INTERN DETAILS */}
        <S.Row>
          <H7C style={detailsStyles.headline} color="lightBlue">
            intern details
          </H7C>
          <S.SubRow>
            <S.Column>
              <PXSBold>Name</PXSBold>
              <PXS>{intern.name}</PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Contact Email</PXSBold>
              <PXS>
                <a
                  href={`mailto:${intern.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {intern.email}
                </a>
              </PXS>
            </S.Column>
            <S.Column>
              <PXSBold>Contact Number</PXSBold>
              <PXS>{intern.phone}</PXS>
            </S.Column>
          </S.SubRow>
        </S.Row>
      </S.ReviewWrapper>
    </>
  );
};
export default BookingCancellationDetails;
