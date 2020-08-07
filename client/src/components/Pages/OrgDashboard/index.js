import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { message, Spin } from 'antd';
import schema from './schema';
import { calculatePrice } from '../../../helpers';

import {
  API_ORGS_DASHBOARD_URL,
  API_INTERNS_URL,
  API_COUPONS_URL,
  API_NOTIFICATION_URL,
} from '../../../constants/apiRoutes';

import Content from './Content';

const moment = extendMoment(Moment);

const initState = {
  orgName: '',
  notifications: [],
  slicedNotifications: [],
  viewNotificationNum: 3,
  markAsSeen: false,
  coupons: [],
  account: {},
  interns: [],
  isCouponModalOpen: false,
  loaded: false,
  internsLoaded: false,
  addedNewInternName: null,
  isNumberInputActive: false,
  discountRate: 0,
  discountPrice: 0,
  code: null,
  addCouponLoading: false,
  showAddFunds: false,
  errors: {},
};

const OrganisationDashboard = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({ ...initState });
  const { windowWidth, role, name, stripe } = props;

  const fetchOrgData = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(API_ORGS_DASHBOARD_URL);
      console.log('data', data);
      setIsLoading(false);
      const [details, notifications, coupons] = data;

      const { account, name: orgName } = details[0];

      // new setState
      setState({ orgName, account });

      const sortedNotification = notifications.sort((a, b) => {
        if (Moment(a.createdAt).isAfter(b.createdAt)) {
          return -1;
        }
        return 1;
      });

      // setState(({ viewNotificationNum }) => ({
      //   details: details[0] || {},
      //   notifications: sortedNotification,
      //   slicedNotifications: sortedNotification.slice(
      //     0,
      //     viewNotificationNum + 1,
      //   ),
      //   account,
      //   coupons,
      //   loaded: true,
      // }));
    } catch (err) {
      setIsLoading(false);
      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchOrgData();
  }, []);

  const validate = () => {
    const { discountRate, internName, internId, endValue, startValue } = state;

    return schema
      .validate(
        {
          discountRate,
          internName,
          internId,
          startDate: startValue,
          endDate: endValue,
        },
        { abortEarly: false },
      )
      .then(res => {
        setState({ errors: {}, attemptedToSubmit: true });
        return res;
      })
      .catch(err => {
        const errors = {};
        err.inner.forEach(element => {
          errors[element.path.split('.')[0]] = element.message;
        });
        setState({ errors, attemptedToSubmit: true });
      });
  };

  const handleSubmitCreateCoupon = () => {
    const {
      internName,
      internId,
      discountRate,
      startValue,
      endValue,
      account,
    } = state;

    const range = moment.range(startValue, endValue);
    const price = (calculatePrice(range) * discountRate) / 100;

    if (account.currentBalance - price < 0) {
      return message.error('No Enough Money!');
    }

    validate().then(
      res =>
        res &&
        setState({ code: null, apiLoading: true }, () => {
          axios
            .post(API_COUPONS_URL, {
              internName,
              intern: internId,
              discountRate,
              startDate: moment(startValue).format('YYYY-MM-DD'),
              endDate: moment(endValue).format('YYYY-MM-DD'),
            })
            .then(({ data }) => {
              const { code } = data;
              setState({
                code,
                apiLoading: false,
              });
              // update organisation data
              fetchOrgData();
            })
            .catch(() => {
              setState({ apiLoading: false });
              return message.error('Something went wrong!');
            });
        }),
    );
  };

  const handleOpenModal = async () => {
    try {
      setState({ addCouponLoading: true });

      const { data: interns } = await axios.get(API_INTERNS_URL);

      setState({
        interns,
        addCouponLoading: false,
        isCouponModalOpen: true,
        code: null,
      });
    } catch (err) {
      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || 'Something went wrong');
    }
  };

  const handleCloseModals = () => {
    setState({ isCouponModalOpen: false });
  };

  const handleFilterInInterns = (input, option) =>
    option.props.label.includes(input.toLowerCase());

  const onChange = (field, value) => {
    const { attemptedToSubmit, startValue, endValue, discountRate } = state;

    const rangeObj = { startValue, endValue };
    // update start and end values with the recent changes
    rangeObj[field] = value;

    let discountPrice = 0;
    if (rangeObj.startValue && rangeObj.endValue && discountRate) {
      const daysPrice = calculatePrice(
        moment.range(rangeObj.startValue, rangeObj.endValue),
      );
      discountPrice = (daysPrice * discountRate) / 100;
    }

    setState(
      {
        [field]: value,
        discountPrice,
      },
      () => {
        if (attemptedToSubmit) {
          validate();
        }
      },
    );
  };

  const onEndChange = value => {
    onChange('endValue', value);
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setState({ endOpen: true });
    } else {
      setState({ endValue: undefined });
    }
  };

  const handleEndOpenChange = open => {
    setState({ endOpen: open });
  };

  const disabledEndDate = endValue => {
    const { startValue } = state;
    if (!endValue || !startValue) {
      return endValue && endValue < moment().subtract(1, 'day');
    }
    return (
      endValue.valueOf() <= startValue.valueOf() ||
      (endValue && endValue < moment().subtract(1, 'day'))
    );
  };

  const onStartChange = value => {
    onChange('startValue', value);
  };

  const disabledStartDate = startValue => {
    const { endValue } = state;
    // false mean not disabled
    if (!startValue || !endValue) {
      return startValue && startValue < moment().subtract(1, 'day');
    }

    return (
      startValue.valueOf() > endValue.valueOf() ||
      (startValue && startValue < moment().subtract(1, 'day'))
    );
  };

  const onSelectInternChange = ({ key, label }) => {
    const { addedNewInternName, attemptedToSubmit } = state;
    setState(
      {
        internName: label || addedNewInternName,
        internId: key === 'removeIt' ? null : key,
        addedNewInternName: null,
      },
      () => {
        if (attemptedToSubmit) {
          validate();
        }
      },
    );
  };

  const onInternSearch = value => {
    const { attemptedToSubmit } = state;

    return (
      value &&
      setState(
        {
          addedNewInternName: value,
          internId: null,
          internName: value,
        },
        () => {
          if (attemptedToSubmit) {
            validate();
          }
        },
      )
    );
  };

  const handleBlurNumberInput = () => {
    setState({ isNumberInputActive: false });
  };

  const handleFocusNumberInput = () => {
    setState({ isNumberInputActive: true });
  };

  const handleDiscountChange = value => {
    const { attemptedToSubmit, startValue, endValue } = state;

    let discountPrice = 0;
    if (startValue && endValue) {
      discountPrice =
        (calculatePrice(moment.range(startValue, endValue)) * Number(value)) /
        100;
    }
    setState({ discountRate: value, discountPrice }, () => {
      if (attemptedToSubmit) {
        validate();
      }
    });
  };

  const handlePayNowClick = show => setState({ showAddFunds: show });

  const handleAccountUpdate = account =>
    setState({ account, showAddFunds: false });

  const markAsSeen = async () => {
    const { notifications, slicedNotifications, markAsSeen } = state;
    if (!markAsSeen) {
      try {
        const newNotifications = slicedNotifications.map(ele => ({ ...ele }));
        const notificationsIds = slicedNotifications.reduce((acc, curr, i) => {
          if (!curr.seenForOrg) {
            acc.push(curr._id);
            newNotifications[i].loading = true;
          }
          return acc;
        }, []);

        setState({
          markAsSeen: true,
          slicedNotifications: newNotifications,
        });
        if (notificationsIds[0]) {
          await axios.patch(`${API_NOTIFICATION_URL}/seen`, notificationsIds);

          const updatedNotifications = notifications.map(update => {
            if (notificationsIds.includes(update._id)) {
              return {
                ...update,
                seenForOrg: true,
                loading: false,
              };
            }
            return update;
          });

          setState(({ viewNotificationNum }) => ({
            notifications: updatedNotifications,
            slicedNotifications: viewNotificationNum
              ? updatedNotifications.slice(0, viewNotificationNum)
              : updatedNotifications,
          }));
        }
      } catch (error) {
        setState({ markAsSeen: false, slicedNotifications });
        message.error('Something went wrong');
      }
    }
  };

  const handleViewMoreToggle = ({
    target: {
      dataset: { name },
    },
  }) => {
    if (name === 'updates') {
      setState(({ viewNotificationNum, notifications }) => ({
        viewNotificationNum: viewNotificationNum ? undefined : 3,
        slicedNotifications: viewNotificationNum
          ? notifications
          : notifications.slice(0, 3),
        markAsSeen: false,
      }));
    }
  };

  const { orgName } = state;

  if (isLoading) return <Spin />;

  return (
    <Content
      orgName={orgName}
      name={name}
      windowWidth={windowWidth}
      stripe={stripe}
      state={state}
      onEndChange={onEndChange}
      handleStartOpenChange={handleStartOpenChange}
      handleEndOpenChange={handleEndOpenChange}
      disabledEndDate={disabledEndDate}
      onStartChange={onStartChange}
      // dateRender={dateRender}
      disabledStartDate={disabledStartDate}
      onSelectInternChange={onSelectInternChange}
      handleOpenModal={handleOpenModal}
      handleFilterInInterns={handleFilterInInterns}
      onInternSearch={onInternSearch}
      handleBlurNumberInput={handleBlurNumberInput}
      handleFocusNumberInput={handleFocusNumberInput}
      handleDiscountChange={handleDiscountChange}
      handleCloseModals={handleCloseModals}
      handleSubmitCreateCoupon={handleSubmitCreateCoupon}
      handlePayNowClick={handlePayNowClick}
      handleAccountUpdate={handleAccountUpdate}
      markAsSeen={markAsSeen}
      handleViewMoreToggle={handleViewMoreToggle}
    />
  );
};

export default OrganisationDashboard;
