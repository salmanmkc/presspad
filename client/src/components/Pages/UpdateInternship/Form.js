import React from 'react';
import moment from 'moment';
import { Input, DatePicker } from '../../Common/Inputs';
import * as T from '../../Common/Typography';
import {
  Row,
  SubRow,
  DatePickersRow,
  UntilLabel,
  Wrapper,
  ContentWrapper,
} from './style';
import File from '../../Common/ProfileComponents/Field/File';

import Button from '../../Common/ButtonNew';
import BookingDetailsBox from '../../Common/BookingDetailsBox';
import { dateRender, formatPrice } from '../../../helpers';

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
        <T.P mt="5">
          The dates you’ve requested to stay do not match the dates of your
          internship. We can only let you stay with hosts during and around the
          dates of your internship.
        </T.P>
        <T.P mt="6" mb="1">
          Please update your internship details below to complete this booking
          request.
        </T.P>

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
        <DatePickersRow>
          <DatePicker
            mt="1"
            mb="1"
            value={
              state.internshipStartDate && moment(state.internshipStartDate)
            }
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
            value={state.internshipEndDate && moment(state.internshipEndDate)}
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
            data-parent="internshipContact"
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
              data-parent="internshipContact"
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
              data-parent="internshipContact"
              error={errors.internshipContact.phoneNumber}
            />
          </SubRow>
        </Row>

        <T.PS mt="5">Please include the organisation’s address</T.PS>

        <Row>
          <SubRow>
            <Input
              label="Address Line 1"
              placeholder="TODO get correct placeholder"
              onChange={onInputChange}
              name="addressline1"
              value={state.internshipOfficeAddress.addressline1}
              data-parent="internshipOfficeAddress"
              error={errors.internshipOfficeAddress.addressline1}
            />
          </SubRow>
          <SubRow>
            <Input
              label="Address Line 2"
              placeholder="TODO get correct placeholder"
              onChange={onInputChange}
              name="addressline2"
              value={state.internshipOfficeAddress.addressline2}
              data-parent="internshipOfficeAddress"
              error={errors.internshipOfficeAddress.addressline2}
            />
          </SubRow>
        </Row>

        <Row>
          <SubRow>
            <Input
              label="City"
              placeholder="TODO get correct placeholder"
              onChange={onInputChange}
              name="city"
              value={state.internshipOfficeAddress.city}
              data-parent="internshipOfficeAddress"
              error={errors.internshipOfficeAddress.city}
            />
          </SubRow>

          <SubRow>
            <Input
              label="Postcode"
              placeholder="TODO get correct placeholder"
              onChange={onInputChange}
              name="postcode"
              value={state.internshipOfficeAddress.postcode}
              data-parent="internshipOfficeAddress"
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
          <File
            placeholder="placeholder"
            handleChange={onUploadInternshipOffer}
            error={errors.offerLetter}
            handleError={fileErrorHandler}
            userId={userId}
            isPrivate
            url={state.offerLetter.url}
            pathname={state.offerLetter.fileName}
          />
        </SubRow>
        <Button
          mt="5"
          ml={isMobile ? '5' : '0'}
          type="primary"
          loading={loading}
          small={isMobile}
        >
          Update and complete request
        </Button>
      </form>
    </ContentWrapper>

    <BookingDetailsBox
      price={formatPrice(bookingData.price)}
      startDate={bookingData.startDate}
      endDate={bookingData.endDate}
      intern
    />
  </Wrapper>
);

export default Form;
