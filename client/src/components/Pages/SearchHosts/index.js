import React, { Component } from 'react';

import Hero from './Hero';

import Hosts from './Hosts';
import NoResults from './NoResults';

import { ContentWrapper } from '../../Layouts/SideMenuLayout/style';
import { disabledStartDate, disabledEndDate } from '../../../helpers';
import {
  getCities,
  fetchListings,
  validateSearch,
  check7And14DaysBooking,
  show7DaysWarning,
} from './utils';

export default class SearchHosts extends Component {
  state = {
    listings: [],
    cities: [],
    searchFields: {
      city: null,
      startDate: null,
      endDate: null,
      acceptAutomatically: null,
    },
    acceptAutomaticallyDisabled: null,
    within7Days: false,
    error: null,
    loading: false,
  };

  resultsRef = React.createRef();

  async componentDidMount() {
    const cities = await getCities();
    this.setState({ cities: [...cities] });
  }

  fetchListings = async () => {
    const { searchFields, within7Days } = this.state;
    if (!within7Days) {
      this.setState({ loading: true });
      const { listings, error } = await fetchListings(searchFields);
      this.setState(
        {
          listings,
          error,
          loading: false,
        },
        this.scrollToResults,
      );
    }
  };

  scrollToResults = () =>
    window.scrollTo({
      left: 0,
      top: this.resultsRef.current.offsetTop,
      behavior: 'smooth',
    });

  onInputCityChange = city => {
    this.setState(
      state => ({ searchFields: { ...state.searchFields, city, error: null } }),
      () => {
        const searchIsValid = this.validateSearch();
        if (searchIsValid) {
          this.fetchListings();
        }
      },
    );
  };

  switchToggle = checked => {
    this.setState(
      state => ({
        error: null,
        searchFields: { ...state.searchFields, acceptAutomatically: checked },
      }),
      this.fetchListings,
    );
  };

  // HANDLING DATE INPUTS
  disabledStartDate = startDate => {
    const { searchFields } = this.state;
    const { endDate } = searchFields;
    return disabledStartDate({ endDate, startDate });
  };

  disabledEndDate = endDate => {
    const { searchFields } = this.state;
    const { startDate } = searchFields;
    return disabledEndDate({ endDate, startDate });
  };

  onDateInputChange = (field, value) => {
    this.setState(
      state => ({
        error: null,
        searchFields: { ...state.searchFields, [field]: value },
      }),
      this.fetchListings,
    );
  };

  onStartChange = value => {
    const { within7Days, within14Days } = check7And14DaysBooking(value);
    //  show the modal

    this.setState(
      state => ({
        within7Days,
        acceptAutomaticallyDisabled: within7Days || within14Days,
        searchFields: {
          ...state.searchFields,
          acceptAutomatically:
            within7Days ||
            within14Days ||
            state.searchFields.acceptAutomatically,
        },
      }),
      () => {
        this.onDateInputChange('startDate', value);
        if (within7Days) {
          // show warning modal
          show7DaysWarning();
        }
      },
    );
  };

  onEndChange = value => {
    this.onDateInputChange('endDate', value);
  };

  onSearchSubmit = e => {
    e.preventDefault();
    const searchIsValid = this.validateSearch();
    if (searchIsValid) {
      this.fetchListings();
    }
  };

  validateSearch = () => {
    const { searchFields } = this.state;
    const { searchIsValid, error } = validateSearch(searchFields);
    this.setState({ error });
    return searchIsValid;
  };

  render() {
    const {
      searchFields,
      error,
      listings,
      cities,
      acceptAutomaticallyDisabled,
      within7Days,
      loading,
    } = this.state;
    const { startDate, endDate, acceptAutomatically, city } = searchFields;

    const formProps = {
      cities,
      startDate,
      endDate,
      acceptAutomatically,
      acceptAutomaticallyDisabled,
      within7Days,
      error,
      loading,
      onInputCityChange: this.onInputCityChange,
      onStartChange: this.onStartChange,
      onEndChange: this.onEndChange,
      disabledStartDate: this.disabledStartDate,
      onSearchSubmit: this.onSearchSubmit,
      switchToggle: this.switchToggle,
      disabledEndDate: this.disabledEndDate,
    };

    return (
      <ContentWrapper>
        <Hero formProps={formProps} />
        <div ref={this.resultsRef}>
          {listings.length > 0 && !within7Days ? (
            <>
              <Hosts
                listings={listings}
                startDate={startDate}
                endDate={endDate}
              />
            </>
          ) : (
            <>
              {startDate || endDate || acceptAutomatically || city ? (
                <NoResults within7Days={within7Days} />
              ) : null}
            </>
          )}
        </div>
      </ContentWrapper>
    );
  }
}
