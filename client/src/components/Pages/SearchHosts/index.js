import React, { Component } from 'react';

import Hero from './Hero';

import Hosts from './Hosts';
import NoResults from './NoResults';

import { ContentWrapper } from '../../Layouts/SideMenuLayout/style';

import {
  getCities,
  fetchListings,
  disabledStartDate,
  disabledEndDate,
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
    errors: {},
  };

  async componentDidMount() {
    const cities = await getCities();
    this.setState({ cities: [...cities] });
  }

  fetchListings = async () => {
    const { searchFields } = this.state;
    const { listings, error } = await fetchListings(searchFields);
    this.setState(state => ({
      listings,
      errors: { ...state.errors, searchError: error },
    }));
  };

  onInputChange = e => {
    const { searchFields } = this.state;
    const newSearchFields = { ...searchFields };
    if (e.target) {
      newSearchFields[e.target.name] = e.target.value;
      this.setState({ searchFields: newSearchFields });
    } else {
      // e is the city <Select>  value
      newSearchFields.city = e;
      this.setState({ searchFields: newSearchFields }, () => {
        const isValid = this.validateSearch();
        if (isValid) {
          this.fetchListings();
        }
      });
    }
  };

  switchToggle = checked => {
    this.setState(state => ({
      searchFields: { ...state.searchFields, acceptAutomatically: checked },
    }));
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
    const { searchFields } = this.state;
    searchFields[field] = value;
    this.setState({ searchFields });
  };

  onStartChange = value => {
    const { within7Days, within14Days } = check7And14DaysBooking;
    //  show the modal
    this.setState(
      state => ({
        within7Days,
        acceptAutomaticallyDisabled: within7Days || within14Days,
        searchFields: {
          ...state.searchFields,
          acceptAutomatically: within7Days || within14Days,
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
    const { isValid } = this.validateSearch();
    // if (isValid) {
    this.fetchListings();
    // }
  };

  validateSearch = () => {
    const { searchFields } = this.state;
    const { searchIsValid, errors } = validateSearch({ ...searchFields });
    this.setState({ errors });
    return searchIsValid;
  };

  render() {
    const {
      searchFields,
      errors,
      listings,
      cities,
      acceptAutomaticallyDisabled,
      within7Days,
    } = this.state;
    const { startDate, endDate, acceptAutomatically } = searchFields;
    const { searchError } = errors;

    const formProps = {
      cities,
      startDate,
      endDate,
      acceptAutomatically,
      acceptAutomaticallyDisabled,
      within7Days,
      onInputChange: this.onInputChange,
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
        {listings.length > 0 && !within7Days ? (
          <Hosts listings={listings} />
        ) : (
          <NoResults within7Days={within7Days} />
        )}
      </ContentWrapper>
    );
  }
}
