import React from 'react';
import moment from 'moment';
import { Input, DatePicker, UploadFile } from '../../Common/Inputs';
import * as T from '../../Common/Typography';
import {
  Row,
  SubRow,
  DatePickersRow,
  UntilLabel,
  Wrapper,
  ContentWrapper,
} from './style';

import Button from '../../Common/ButtonNew';
import BookingDetailsBox from '../../Common/BookingDetailsBox';
import { dateRender, createSingleDate } from '../../../helpers';

const Form = ({
  state,
  errors,
  loading,
  userId,
  onInputChange,
  disabledStartDate,
  onStartChange,
  disabledEndDate,
  onEndChange,
  onUploadInternshipOffer,
  fileErrorHandler,
  onSubmit,
  bookingData,
  isMobile,
}) => (
  <Wrapper>
    <ContentWrapper>
      <form onSubmit={onSubmit}>
        <T.H3C mt="3">update internship details</T.H3C>
        <Row>
          {bookingData.couponInvalidStart && bookingData.couponInvalidEnd ? (
            <T.P mt="5" color="red">
              This discount code you entered (valid between&nbsp;
              {createSingleDate(bookingData.couponInvalidStart)} and&nbsp;
              {createSingleDate(bookingData.couponInvalidEnd)}) does not match
              the internship details. Please update your internship details
              accordingly or contact the organisation to get them to give you a
              new discount code.
            </T.P>
          ) : (
            <T.P mt="5">
              The dates you’ve requested to stay do not match the dates of your
              internship. We can only let you stay with hosts during and around
              the dates of your internship.
            </T.P>
          )}

          <T.P mt="6" mb="1">
            Please update your internship details below to complete this booking
            request.
          </T.P>
        </Row>
        <Row>
          <SubRow>
            <Input
              label="Organisation"
              placeholder="Type where your internship is..."
              name="organisation"
              value={state.organisation}
              onChange={onInputChange}
              error={errors.organisation}
            />
          </SubRow>
        </Row>

        <T.PBold>Dates of internship</T.PBold>
        {state.bursary.status === 'approved' && (
          <T.PBold mt="2" mb="1" color="red">
            As you have been granted a PressPad bursary you cannot update your
            internship dates. Please contact us for further information.
          </T.PBold>
        )}
        <DatePickersRow>
          <DatePicker
            mt="1"
            mb="1"
            value={
              state.bursary && state.bursary.startDate
                ? moment(state.bursary.startDate)
                : state.internshipStartDate && moment(state.internshipStartDate)
            }
            disabled={state.bursary && state.bursary.startDate}
            disabledDate={disabledStartDate}
            onChange={onStartChange}
            dateRender={current =>
              dateRender({
                current,
                startDate: state.internshipStartDate,
                endDate: state.internshipEndDate,
              })
            }
            error={errors.internshipStartDate}
          />

          <UntilLabel mr="3" ml="3">
            Until
          </UntilLabel>
          <DatePicker
            mt="1"
            mb="1"
            value={
              state.bursary && state.bursary.endDate
                ? moment(state.bursary.endDate)
                : state.internshipEndDate && moment(state.internshipEndDate)
            }
            disabled={state.bursary && state.bursary.endDate}
            disabledDate={disabledEndDate}
            onChange={onEndChange}
            dateRender={current =>
              dateRender({
                current,
                startDate: state.internshipStartDate,
                endDate: state.internshipEndDate,
              })
            }
            error={errors.internshipEndDate}
          />
        </DatePickersRow>
        <T.PS mt="6">
          Please include contact details for someone from the organisation for
          us to verify your internship
        </T.PS>

        <SubRow>
          <Input
            label="Contact Name"
            placeholder="Type full name here..."
            onChange={onInputChange}
            name="name"
            value={state.internshipContact.name}
            parent="internshipContact"
            error={errors.internshipContact.name}
          />
        </SubRow>

        <Row>
          <SubRow>
            <Input
              label="Contact Email"
              placeholder="Type email here..."
              onChange={onInputChange}
              name="email"
              value={state.internshipContact.email}
              parent="internshipContact"
              error={errors.internshipContact.email}
            />
          </SubRow>
          <SubRow>
            <Input
              label="Contact Number"
              placeholder="Type number here..."
              onChange={onInputChange}
              name="phoneNumber"
              value={state.internshipContact.phoneNumber}
              parent="internshipContact"
              error={errors.internshipContact.phoneNumber}
            />
          </SubRow>
        </Row>

        <T.PS mt="5">Please include the organisation’s address</T.PS>

        <Row>
          <SubRow>
            <Input
              label="Address Line 1"
              placeholder="Address line 1..."
              onChange={onInputChange}
              name="addressline1"
              value={state.internshipOfficeAddress.addressline1}
              parent="internshipOfficeAddress"
              error={errors.internshipOfficeAddress.addressline1}
            />
          </SubRow>
          <SubRow>
            <Input
              label="Address Line 2"
              placeholder="Address line 2..."
              onChange={onInputChange}
              name="addressline2"
              value={state.internshipOfficeAddress.addressline2}
              parent="internshipOfficeAddress"
              error={errors.internshipOfficeAddress.addressline2}
            />
          </SubRow>
        </Row>

        <Row>
          <SubRow>
            <Input
              label="City"
              placeholder="city..."
              onChange={onInputChange}
              name="city"
              value={state.internshipOfficeAddress.city}
              parent="internshipOfficeAddress"
              error={errors.internshipOfficeAddress.city}
            />
          </SubRow>

          <SubRow>
            <Input
              label="Postcode"
              placeholder="postcode..."
              onChange={onInputChange}
              name="postcode"
              value={state.internshipOfficeAddress.postcode}
              parent="internshipOfficeAddress"
              error={errors.internshipOfficeAddress.postcode}
            />
          </SubRow>
        </Row>
        <T.PBold mt="6">Proof of internship offer</T.PBold>
        <T.PXS>
          e.g. a photo of an offer letter / email or a photo of anything else
          that can be used as proof of your internship.
        </T.PXS>
        <T.PXS>
          Please make sure you image is clear enough to read or your request may
          be automatically rejected
        </T.PXS>
        <SubRow>
          <UploadFile
            mainText="Upload file by dragging here"
            secondaryText="file size max 2mb"
            type="file"
            userId={userId}
            files={[state.offerLetter]}
            setFiles={([offerLetter]) => onUploadInternshipOffer(offerLetter)}
            error={errors.offerLetter}
            col={12}
          />
        </SubRow>
        <Button
          mt="5"
          ml={isMobile ? '5' : '0'}
          type="primary"
          loading={loading}
          small={isMobile}
          disabled={state.bursary.status === 'approved'}
        >
          Update and complete request
        </Button>
      </form>
    </ContentWrapper>

    <BookingDetailsBox
      price={bookingData.price}
      startDate={bookingData.startDate}
      endDate={bookingData.endDate}
      intern
    />
  </Wrapper>
);

export default Form;
