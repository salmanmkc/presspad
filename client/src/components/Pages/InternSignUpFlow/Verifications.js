import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Input, UploadFile, DatePicker, Checkbox } from '../../Common/Inputs';
import { Col, Row } from '../../Common/Grid';
import Title from '../../Common/Title';

import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import {
  API_INTERN_SETTINGS_VERIFICATIONS,
  API_MY_PROFILE_URL,
} from '../../../constants/apiRoutes';
import { WELCOME_PAGES } from '../../../constants/navRoutes';

import Notification from '../../Common/Notification';

const { validate, internSignup } = require('../../../validation');

const getCleanData = (d = {}) => ({
  organisation: d.organisation || '',
  internshipContact: d.internshipContact || {
    name: '',
    email: '',
    phoneNumber: '',
  },
  internshipStartDate: d.internshipStartDate || null,
  internshipEndDate: d.internshipEndDate || null,
  internshipOfficeAddress: d.internshipOfficeAddress || {
    addressline1: '',
    addressline2: '',
    city: '',
    postcode: '',
  },
  reference1: d.reference1 || {
    name: '',
    email: '',
  },
  reference2: d.reference2 || {
    name: '',
    email: '',
  },
  photoID: d.photoID || {
    fileName: '',
  },
  DBSCheck: d.DBSCheck || {
    fileName: '',
  },
  refNum: d.refNum || (d.DBSCheck && d.DBSCheck.refNum) || '',
  offerLetter: d.offerLetter || {
    fileName: '',
  },
  hasNoInternship: d.hasNoInternship || false,
});

const Verifications = props => {
  const [state, setState] = useState({
    ...getCleanData({}),
    agreedOnPartnershipAgreement: false,
    agreedOnMediaFormRelease: false,
  });

  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState();

  const [saveLoading, setSaveLoading] = useState(false);
  const [continueLoading, setContinueLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [prevData, setPrevData] = useState({});
  const [fetchData, setFetchData] = useState(0);
  const [fetchingData, setFetchingData] = useState(true);
  const [lastClickOnContinue, setLastClickOnContinue] = useState(false);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, []);

  const uploadFile = async (file = {}) => {
    try {
      const generatedName = `${props.id}/${Date.now()}.${file.name}`;
      const {
        data: { signedUrl },
      } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);
      const headers = {
        'Content-Type': 'application/octet-stream',
      };

      await axios.put(signedUrl, file, {
        headers,
      });

      return {
        fileName: generatedName,
        new: true,
        uploaded: true,
        preview: file.preview,
      };
    } catch (e) {
      return setMainError(e.message);
    }
  };

  const _validate = async () => {
    const { errors: _errors } = await validate({
      schema: internSignup.verifications(
        prevData,
        lastClickOnContinue,
        state.hasNoInternship,
      ),
      data: { ...state },
    });
    let e = _errors;
    if (prevData.photoID && state.photoID.deleted) {
      e = e
        ? { ...e, photoID: 'identity proof is required' }
        : { photoID: 'identity proof is required' };
    }
    if (prevData.DBSCheck && state.DBSCheck.deleted) {
      e = e
        ? { ...e, DBSCheck: 'DBS file is required' }
        : { DBSCheck: 'DBS file is required' };
    }
    if (
      prevData.offerLetter &&
      state.offerLetter.deleted &&
      !state.hasNoInternship
    ) {
      e = e
        ? { ...e, offerLetter: 'Proof of internship file is required' }
        : { offerLetter: 'Proof of internship file is required' };
    }
    return e;
  };

  const onInputChange = e => {
    const { value, name } = e.target;

    setErrors(_errors => ({ ..._errors, [name]: '' }));
    return setState(_state => ({ ..._state, [name]: value }));
  };
  const update = async (_DBSCheck, _photoID, _offerLetter) => {
    try {
      await axios.patch(API_INTERN_SETTINGS_VERIFICATIONS, {
        ...state,
        DBSCheck: _DBSCheck || state.DBSCheck,
        photoID: _photoID || state.photoID,
        offerLetter: _offerLetter || state.offerLetter,
        prevPhotoIDToDelete:
          state.photoID &&
          state.photoID.new &&
          prevData.photoID &&
          prevData.photoID.fileName &&
          prevData.photoID.fileName,
        prevDBSCheckToDelete:
          state.DBSCheck &&
          state.DBSCheck.new &&
          prevData.DBSCheck &&
          prevData.DBSCheck.fileName &&
          prevData.DBSCheck.fileName,
        prevOfferLetterToDelete:
          state.offerLetter &&
          state.offerLetter.new &&
          prevData.offerLetter &&
          prevData.offerLetter.fileName &&
          prevData.offerLetter.fileName,
      });
    } catch (e) {
      setMainError(e.response.data.error);
    } finally {
      setContinueLoading(false);
      setSaveLoading(false);
      setFetchingData(true);
    }
  };

  const onSubmit = async isContinue => {
    let _DBSCheck;
    let _photoID;
    let _offerLetter;
    const _errors = await _validate();

    setErrors(_errors || {});

    if (_errors) {
      setMainError('Must fill all required fields');
      return;
    }
    setMainError();

    setLastClickOnContinue(isContinue);

    if (isContinue) {
      setContinueLoading(true);
    } else {
      setSaveLoading(true);
    }

    if (
      (state.DBSCheck && state.DBSCheck.new && !state.DBSCheck.uploaded) ||
      (state.photoID && state.photoID.new && !state.photoID.uploaded) ||
      (state.offerLetter &&
        state.offerLetter.new &&
        !state.offerLetter.uploaded)
    ) {
      const promiseArr = [];
      if (state.DBSCheck && state.DBSCheck.new) {
        promiseArr.push(
          uploadFile(state.DBSCheck).catch(err =>
            setErrors(e => ({ ...e, DBSCheck: err.message })),
          ),
        );
      } else {
        promiseArr.push(Promise.resolve());
      }

      if (state.photoID && state.photoID.new) {
        promiseArr.push(
          uploadFile(state.photoID).catch(err =>
            setErrors(e => ({ ...e, photoID: err.message })),
          ),
        );
      } else {
        promiseArr.push(Promise.resolve());
      }

      if (state.offerLetter && state.offerLetter.new) {
        promiseArr.push(
          uploadFile(state.offerLetter).catch(err =>
            setErrors(e => ({ ...e, offerLetter: err.message })),
          ),
        );
      } else {
        promiseArr.push(Promise.resolve());
      }

      [_DBSCheck, _photoID, _offerLetter] = await Promise.all(promiseArr);
    }
    await update(_DBSCheck, _photoID, _offerLetter);
    setNotificationOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      const {
        data: { profile },
      } = await axios.get(API_MY_PROFILE_URL);

      setState(getCleanData(profile));
      setPrevData(getCleanData(profile));
      setFetchingData(false);
    };
    getData();
  }, [fetchData]);

  const done = () => {
    if (lastClickOnContinue) {
      history.push(WELCOME_PAGES.replace(':id', '1'));
    } else {
      setFetchData(e => e + 1);
    }
  };

  useEffect(() => {
    if (state.hasNoInternship) {
      setState(_state => ({
        ..._state,
        organisation: '',
        internshipContact: {},
        internshipStartDate: null,
        internshipEndDate: null,
        offerLetter: { fileName: '', deleted: true },
      }));
    }
  }, [state.hasNoInternship]);

  return (
    <div style={{ marginTop: '4rem' }}>
      <Row>
        <Title withBg mb="0">
          <Col w={[4, 12, 12]}>GET VERIFIED</Col>
        </Title>
      </Row>

      <Row>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue">
            Nearly there! To make sure PressPad is a safe place for interns and
            hosts, we just need a bit more information to verify who you are and
            why you are using our services.
          </T.H5>
          <T.H5 color="blue" mt={6}>
            Placement Details
          </T.H5>
          <T.P color="gray3" mt={2}>
            In order to stay with one of our hosts and be eligble for our
            bursary, you need an internship, work placements or contract lined
            up. Don’t worry if you don’t have one right now - we can still get
            you on the platform and you can add these details later so when you
            do have one, we can get you hosted ASAP!
          </T.P>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 12]} mt={5}>
          <Checkbox
            label="I do not currently have an internship/placement/contract"
            onChange={e =>
              setState(_state => ({
                ..._state,
                hasNoInternship: e.target.checked,
              }))
            }
            checked={state.hasNoInternship}
          />
        </Col>
      </Row>

      {!state.hasNoInternship && (
        <>
          <Row>
            <Col w={[4, 6, 6]} mt={4}>
              <Input
                onChange={onInputChange}
                value={state.organisation}
                label="Name of organisation"
                name="organisation"
                error={errors.organisation}
              />
            </Col>

            <Col w={[4, 6, 6]} mt={4}>
              <Input
                onChange={e => {
                  e.persist();
                  setState(_state => ({
                    ..._state,
                    internshipContact: {
                      ...state.internshipContact,
                      name: e.target.value,
                    },
                  }));
                }}
                value={state.internshipContact && state.internshipContact.name}
                label="Contact name"
                placeholder="Contact name..."
                name="name"
                error={
                  errors.internshipContact && errors.internshipContact.name
                }
              />
            </Col>
          </Row>

          <Row>
            <Col w={[4, 6, 6]} mt={4}>
              <Input
                onChange={e => {
                  e.persist();
                  setState(_state => ({
                    ..._state,
                    internshipContact: {
                      ...state.internshipContact,
                      email: e.target.value,
                    },
                  }));
                }}
                value={state.internshipContact && state.internshipContact.email}
                label="Contact email"
                placeholder="Contact email..."
                name="email"
                error={
                  errors.internshipContact && errors.internshipContact.email
                }
              />
            </Col>
            <Col w={[4, 6, 6]} mt={4}>
              <Input
                onChange={e => {
                  e.persist();
                  setState(_state => ({
                    ..._state,
                    internshipContact: {
                      ...state.internshipContact,
                      phoneNumber: e.target.value,
                    },
                  }));
                }}
                value={
                  state.internshipContact && state.internshipContact.phoneNumber
                }
                label="Contact number"
                placeholder="Contact number..."
                name="phoneNumber"
                error={
                  errors.internshipContact &&
                  errors.internshipContact.phoneNumber
                }
              />
            </Col>
          </Row>

          <Row>
            <Col w={[4, 6, 6]} mt={4}>
              <DatePicker
                onChange={momentDate =>
                  setState(_state => ({
                    ..._state,
                    internshipStartDate: momentDate,
                  }))
                }
                value={state.internshipStartDate}
                label="Start date"
                error={errors.internshipStartDate}
              />
            </Col>

            <Col w={[4, 6, 6]} mt={4}>
              <DatePicker
                onChange={momentDate =>
                  setState(_state => ({
                    ..._state,
                    internshipEndDate: momentDate,
                  }))
                }
                value={state.internshipEndDate}
                label="End date"
                error={errors.internshipEndDate}
              />
            </Col>
          </Row>

          <Row>
            <Col w={[4, 6, 6]} mt={4}>
              <Input
                onChange={e => {
                  e.persist();
                  setState(_state => ({
                    ..._state,
                    internshipOfficeAddress: {
                      ...state.internshipOfficeAddress,
                      addressline1: e.target.value,
                    },
                  }));
                }}
                value={
                  state.internshipOfficeAddress &&
                  state.internshipOfficeAddress.addressline1
                }
                label="Address Line 1"
                name="addressline1"
                error={
                  errors.internshipOfficeAddress &&
                  errors.internshipOfficeAddress.addressline1
                }
              />
            </Col>

            <Col w={[4, 6, 6]} mt={4}>
              <Input
                onChange={e => {
                  e.persist();
                  setState(_state => ({
                    ..._state,
                    internshipOfficeAddress: {
                      ...state.internshipOfficeAddress,
                      addressline2: e.target.value,
                    },
                  }));
                }}
                value={
                  state.internshipOfficeAddress &&
                  state.internshipOfficeAddress.addressline2
                }
                label="Address Line 2"
                name="addressline2"
                error={
                  errors.internshipOfficeAddress &&
                  errors.internshipOfficeAddress.addressline2
                }
              />
            </Col>
          </Row>

          <Row>
            <Col w={[4, 6, 6]} mt={4}>
              <Input
                onChange={e => {
                  e.persist();
                  setState(_state => ({
                    ..._state,
                    internshipOfficeAddress: {
                      ...state.internshipOfficeAddress,
                      city: e.target.value,
                    },
                  }));
                }}
                value={
                  state.internshipOfficeAddress &&
                  state.internshipOfficeAddress.city
                }
                label="City"
                name="city"
                error={
                  errors.internshipOfficeAddress &&
                  errors.internshipOfficeAddress.city
                }
              />
            </Col>

            <Col w={[4, 6, 6]} mt={4}>
              <Input
                onChange={e => {
                  e.persist();

                  setState(_state => ({
                    ..._state,
                    internshipOfficeAddress: {
                      ...state.internshipOfficeAddress,
                      postcode: e.target.value,
                    },
                  }));
                }}
                value={
                  state.internshipOfficeAddress &&
                  state.internshipOfficeAddress.postcode
                }
                label="Postcode"
                name="postcode"
                error={
                  errors.internshipOfficeAddress &&
                  errors.internshipOfficeAddress.postcode
                }
              />
            </Col>
          </Row>

          <Row>
            <Col w={[4, 8, 8]}>
              <T.H5 color="blue" mt={4}>
                Proof of internship
              </T.H5>
              <T.P color="gray3">
                e.g. an offer letter or something similar that can be used as
                proof of your internship
              </T.P>
            </Col>
          </Row>

          <UploadFile
            mainText="Upload file by dragging here"
            secondaryText="file size max 2mb"
            type="file"
            userId={props.id}
            files={[state.offerLetter]}
            setFiles={([offerLetter]) =>
              setState(_state => ({
                ..._state,
                offerLetter,
              }))
            }
            error={errors.offerLetter}
          />
        </>
      )}

      <Row>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue" mt={8}>
            References
          </T.H5>
          <T.P color="gray3">
            This can be any professional you have worked with during your career
            or a teacher / lecturer / tutor
          </T.P>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                reference1: {
                  ...state.reference1,
                  name: e.target.value,
                },
              }));
            }}
            value={state.reference1 && state.reference1.name}
            label="1. Reference name"
            name="name"
            error={errors.reference1 && errors.reference1.name}
          />
        </Col>

        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                reference1: {
                  ...state.reference1,
                  email: e.target.value,
                },
              }));
            }}
            value={state.reference1 && state.reference1.email}
            label="Reference email"
            name="email"
            error={errors.reference1 && errors.reference1.email}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                reference2: {
                  ...state.reference2,
                  name: e.target.value,
                },
              }));
            }}
            value={state.reference2 && state.reference2.name}
            label="2. Reference name"
            name="name"
            error={errors.reference2 && errors.reference2.name}
          />
        </Col>

        <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
          <Input
            onChange={e => {
              e.persist();
              setState(_state => ({
                ..._state,
                reference2: {
                  ...state.reference2,
                  email: e.target.value,
                },
              }));
            }}
            value={state.reference2 && state.reference2.email}
            label="Reference email"
            name="email"
            error={errors.reference2 && errors.reference2.email}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue" mt={8}>
            Verification documents
          </T.H5>
          <T.PBold color="blue">Proof of identity </T.PBold>
          <T.PXS color="gray3">
            This can be any professional you have worked with during your career
            or a teacher / lecturer / tutor
          </T.PXS>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 12]}>
          <UploadFile
            mainText="Upload your identity picture here"
            secondaryText="file size max 2mb"
            type="file"
            userId={props.id}
            files={[state.photoID]}
            setFiles={([photoID]) =>
              setState(_state => ({ ..._state, photoID }))
            }
            error={errors.photoID}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 8, 8]}>
          <T.H5 color="blue" mt={8}>
            DBS Certificate{' '}
          </T.H5>

          <T.PXS color="gray3">
            This is the official UK criminal records check. If you don’t have
            one, please click here and we will do it for you for free. It will
            take no longer than 5 minutes to complete
          </T.PXS>
        </Col>
      </Row>

      <UploadFile
        mainText="Upload your DBS Certificate here"
        secondaryText="file size max 2mb"
        type="file"
        userId={props.id}
        files={[state.DBSCheck]}
        setFiles={([DBSCheck]) =>
          setState(_state => ({
            ..._state,
            DBSCheck,
          }))
        }
        error={errors.DBSCheck}
      />
      <Row>
        <Col w={[4, 6, 6]} mt={4}>
          <Input
            onChange={onInputChange}
            value={state.refNum}
            label="DBS number"
            name="refNum"
            error={errors.refNum}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 12]} mt={6}>
          <T.H5 color="blue">Partnership Agreement</T.H5>
          <T.P color="gray3">
            It is important for us that both host and intern go into any stay
            with the best of intentions. This is why we ask everyone to read and
            agree to the Partnership Agreement which outlines the commitments
            you are making to each other.{' '}
          </T.P>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 12]} mt={5}>
          <Checkbox
            label="I have read and agree with the Partnernship Agreement"
            onChange={e =>
              setState(_state => ({
                ..._state,
                agreedOnPartnershipAgreement: e.target.checked,
              }))
            }
            checked={state.agreedOnPartnershipAgreement}
            error={errors.agreedOnPartnershipAgreement}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 12]} mt={6}>
          <T.H5 color="blue">Media Release Form</T.H5>
          <T.P color="gray3">
            Agreeing to PressPad&apos;s media release form means that you
            consent for us to use any information you provide us when signing
            up, using or reviewing PressPad&apos;s services in our promotional
            and marketing materials. It also means that if we ask you to star in
            our next Youtube video or give an interview to the media about
            PressPad (don&apos;t be shy!) we already have all the paperwork we
            need from you.
          </T.P>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 12, 12]} mt={5} mb={5}>
          <Checkbox
            label="I have read and agree with the Media Release Form"
            onChange={e =>
              setState(_state => ({
                ..._state,
                agreedOnMediaFormRelease: e.target.checked,
              }))
            }
            checked={state.agreedOnMediaFormRelease}
            error={errors.agreedOnMediaFormRelease}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 12]}>
          {mainError && <T.PXS color="pink">{mainError}</T.PXS>}
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 5.3]} mb={4} mbT={3}>
          <Button
            type="secondary"
            onClick={() => onSubmit()}
            loading={saveLoading}
            disabled={saveLoading || continueLoading || fetchingData}
            outline
          >
            SAVE PROGRESS
          </Button>
        </Col>

        <Col w={[4, 6, 5.3]} mb={4} mbT={3}>
          <Button
            type="secondary"
            onClick={() => onSubmit(true)}
            loading={continueLoading}
            disabled={
              saveLoading ||
              continueLoading ||
              fetchingData ||
              !state.agreedOnPartnershipAgreement ||
              !state.agreedOnMediaFormRelease
            }
          >
            Finish
          </Button>
        </Col>
      </Row>

      <Row style={{ textAlign: 'center' }} mb={8}>
        <Col w={[4, 12, 11.6]} style={{ marginTop: '30px' }}>
          <T.Link to={WELCOME_PAGES.replace(':id', '1')} color="pink">
            I’ll finish this later
          </T.Link>
        </Col>
      </Row>
      <Notification
        open={notificationOpen}
        setOpen={setNotificationOpen}
        content="Changes saved"
        cb={done}
      />
    </div>
  );
};

export default Verifications;
