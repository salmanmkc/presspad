import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Input,
  UploadFile,
  DatePicker,
  Checkbox,
} from '../../../Common/Inputs';
import { Col, Row } from '../../../Common/Grid';

import * as T from '../../../Common/Typography';
import Button from '../../../Common/ButtonNew';
import {
  API_INTERN_SETTINGS_VERIFICATIONS,
  API_MY_PROFILE_URL,
  API_BURSARY_APPLICATIONS_STATUS,
} from '../../../../constants/apiRoutes';
import { SETTINGS } from '../../../../constants/navRoutes';

import Notification from '../../../Common/Notification';

const { validate, internSettings } = require('../../../../validation');

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
  hasInternship: d.hasInternship || false,
  hasNoInternship: d.hasNoInternship || false,
});

const Verifications = props => {
  const [state, setState] = useState(getCleanData({}));

  const [errors, setErrors] = useState({});
  const [mainError, setMainError] = useState();
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [hasActiveBursary, setHasActiveBursary] = useState(false);

  const [prevData, setPrevData] = useState({});
  const [fetchData, setFetchData] = useState(0);

  const history = useHistory();

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
      schema: internSettings.verifications(prevData, state.hasNoInternship),
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
    if (prevData.offerLetter && state.offerLetter.deleted) {
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
      setLoading(false);
    }
  };

  const onSubmit = async () => {
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
    setLoading(true);
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

      const { data: activeBursaries } = await axios.get(
        API_BURSARY_APPLICATIONS_STATUS,
      );

      setState(getCleanData(profile));
      setPrevData(getCleanData(profile));
      if (activeBursaries) {
        setHasActiveBursary(true);
      }
    };
    getData();
  }, [fetchData]);

  const done = () => {
    if (
      (prevData.DBSCheck &&
        state.refNum &&
        prevData.DBSCheck.refNum !== state.refNum) ||
      (prevData.DBSCheck &&
        prevData.DBSCheck.fileName &&
        state.DBSCheck &&
        state.DBSCheck.fileName &&
        prevData.DBSCheck.fileName !== state.DBSCheck.fileName)
    ) {
      history.push(SETTINGS.UNDER_REVIEW);
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
    <div style={{ marginTop: '2rem' }}>
      <Row>
        <Col w={[4, 4, 4]}>
          <T.H5 color="blue">Internship Details</T.H5>
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
            <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
              <Input
                onChange={onInputChange}
                value={state.organisation}
                label="Name of organisation"
                name="organisation"
                error={errors.organisation}
                disabled={hasActiveBursary}
              />
            </Col>

            <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
                disabled={hasActiveBursary}
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
                disabled={hasActiveBursary}
              />
            </Col>
            <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
                disabled={hasActiveBursary}
              />
            </Col>
          </Row>

          <Row>
            <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
                disabled={hasActiveBursary}
              />
            </Col>

            <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
                disabled={hasActiveBursary}
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
                disabled={hasActiveBursary}
              />
            </Col>

            <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
                disabled={hasActiveBursary}
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
                disabled={hasActiveBursary}
              />
            </Col>

            <Col w={[4, 6, 6]} style={{ marginTop: '20px' }}>
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
                disabled={hasActiveBursary}
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
            disabled={hasActiveBursary}
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
        <Col w={[4, 6, 6]} mt={4}>
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

        <Col w={[4, 6, 6]} mt={4}>
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
        <Col w={[4, 6, 6]} mt={4}>
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

        <Col w={[4, 6, 6]} mt={4}>
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
        mainText="Upload your DBS certificate here"
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
        <Col w={[4, 6, 4]} style={{ marginTop: '48px' }}>
          {mainError && <T.PXS color="pink">{mainError}</T.PXS>}

          <Button type="secondary" onClick={onSubmit} loading={loading}>
            SAVE CHANGES
          </Button>
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
