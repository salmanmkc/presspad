import styled from 'styled-components';
import { colors, borders, size } from '../../../theme';

const classNames = {
  reactCalendar: '.react-calendar',
  reactCalendarNavigation: '.react-calendar__navigation',
  reactCalendarMonthViewWeekdays: '.react-calendar__month-view__weekdays',
  reactCalendarMonthViewWeekdaysWeekday:
    '.react-calendar__month-view__weekdays__weekday',
  reactCalendarMonthViewWeekNumbers: '.react-calendar__month-view__weekNumbers',
  reactCalendarMonthViewDaysDay: '.react-calendar__month-view__days__day',
  reactCalendarMonthViewDaysDayWeekend:
    '.react-calendar__month-view__days__day--weekend',
  reactCalendarMonthViewDaysDayNeighboringMonth:
    '.react-calendar__month-view__days__day--neighboringMonth',
  reactCalendarYearView: '.react-calendar__year-view',
  reactCalendarDecadeView: '.react-calendar__decade-view',
  reactCalendarCenturyView: '.react-calendar__century-view',
  reactCalendarTile: '.react-calendar__tile',
  reactCalendarTileHasActive: '.react-calendar__tile--hasActive',
  reactCalendarTileActive: '.react-calendar__tile--active',
  reactCalendarSelectRange: '.react-calendar--selectRange',
  reactCalendarTileHover: '.react-calendar__tile--hover',
};

export const CalendarWrapper = styled.div.attrs(classNames)`
  ${classNames.reactCalendar} {
    padding-top: 2rem;
    max-width: 100%;
    font-family: Glacial Indifference;
    line-height: 1.125em;
    font-size: 1.2rem;
    *,
    *:before,
    *:after {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    button {
      margin: 0;
      border: 0;
      outline: none;
    }
    button:enabled:hover {
      cursor: pointer;
    }
  }
  ${classNames.reactCalendarNavigation} {
    height: 44px;
    margin-bottom: 1em;


    button {
      min-width: 50px;
      background: none;
    }

    button:enabled:hover,
    button:enabled:focus {
      background-color: ${colors.grayWhite}
    }

    button[disabled] {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1em;
    }
  }
  ${classNames.reactCalendarMonthViewWeekdays} {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1em;
    border-bottom: ${borders.lightDivider};

    :hover {
      cursor: pointer;
    }
  }

  ${classNames.reactCalendarMonthViewWeekdaysWeekday} {
    padding: 0.5em;
  }
  ${classNames.reactCalendarMonthViewWeekNumbers} {
    font-weight: bold;
  }

  ${classNames.reactCalendarMonthViewWeekNumbers}, ${classNames.reactCalendarTile} {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(1em) calc(0.66666666666667em);
  }
  ${classNames.reactCalendarMonthViewDaysDay} {
    font-size: 1em;
  }
  ${classNames.reactCalendarMonthViewDaysDayWeekend} {
  }

  ${classNames.reactCalendarMonthViewDaysDayNeighboringMonth} {
    color: ${colors.lightGray};
  }
  ${classNames.reactCalendarYearView} ${classNames.reactCalendarTile},${classNames.reactCalendarDecadeView} ${classNames.reactCalendarTile},${classNames.reactCalendarCenturyView} ${classNames.reactCalendarTile} {
    padding: 2em 0.5em;
  }
  ${classNames.reactCalendarTile} {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;

    :disabled {
      background-color: ${colors.transGray};
      color: ${colors.white};
      opacity: 0.5;
    }

    :enabled:hover,
    :enabled:focus {
      background-color: ${colors.lightBlue};
      color: ${colors.white};
    }
  }

  ${classNames.reactCalendarTileHasActive} {
    background: ${colors.lightBlue};
    :enabled:hover,
    :enabled:focus {
      background: ${colors.lightBlue};
      color: ${colors.white};
    }
  }
  ${classNames.reactCalendarTileActive} {
    background: ${colors.lightBlue};
    color: ${colors.white};
    :enabled:hover,
    :enabled:focus {
      background: #0ac7e7;
    }
  }
  ${classNames.reactCalendarSelectRange} ${classNames.reactCalendarTileHover} {
    background-color: ${colors.lightBlue};
    color: ${colors.white};
  }
`;

export const BookingRequestDetails = styled.div`
  margin-top: 5rem;

  @media (max-width: ${size.mobileL}) {
    height: auto;
    padding-bottom: 1rem;
    margin-top: 2rem;
  }
`;

export const BursaryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;

export const PopoverContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;

  p {
    padding-right: 0.5rem;
    line-height: 1.6;
  }

  @media (max-width: ${size.mobileL}) {
  }
`;

export const RequestBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 2rem;

  @media (max-width: ${size.mobileL}) {
    padding-bottom: 0;
  }
`;

export const CodeInput = styled.input`
  width: 200px;

  border: ${borders.newInputBox};
  border-radius: 10px;

  @media (max-width: ${size.mobileL}) {
    width: 160px;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
`;

export const Col = styled.div`
  @media (max-width: ${size.mobileM}) {
    margin-right: ${({ value }) => value && '-2rem'};
  }
`;

export const PriceHeadline = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  line-height: 2;
  text-align: left;
  margin-top: 10px;

  @media (max-width: ${size.mobileM}) {
    line-height: 1.5;
  }
`;
export const PriceLabel = styled.h1`
  font-weight: bold;
  font-size: 2rem;

  @media (max-width: ${size.mobileM}) {
    margin: 0;
  }
`;

export const RequestBtn = styled.button`
  background: ${props =>
    props.disabled ? `${colors.lightGray}` : `${colors.lightBlue}`};
  opacity: ${props => (props.disabled ? '0.7' : '')};
  border-radius: 17.5px;
  font-size: 1rem;
  color: ${colors.white};
  border: none;
  padding: 0.5rem 4rem;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  :focus,
  :hover {
    transform: ${props => (!props.disabled ? 'scale(1.1)' : '')};
  }
`;

export const ErrorDiv = styled.div`
  margin-top: 1rem;
`;

export const PriceTopDiv = styled.div`
  @media (max-width: ${size.mobileM}) {
    display: flex;
    padding: 0.5rem 0;
    justify-content: space-between;
  }
`;

export const InputLabel = styled.label`
  font-size: 1rem;
  color: ${colors.fontLightBlack};
  line-height: 2rem;
`;

export const DiscountPriceDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;
