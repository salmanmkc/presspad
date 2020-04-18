import {
  MOBILE_S_WIDTH,
  MOBILE_M_WIDTH,
  MOBILE_L_WIDTH,
  MOBILE_XL_WIDTH,
  TABLET_WIDTH,
  LAPTOP_WIDTH,
  LAPTOP_L_WIDTH,
  DESKTOP_WIDTH,
} from './constants/screenWidths';

// media queries
export const size = {
  mobileS: `${MOBILE_S_WIDTH}px`,
  mobileM: `${MOBILE_M_WIDTH}px`,
  mobileL: `${MOBILE_L_WIDTH}px`,
  mobileXL: `${MOBILE_XL_WIDTH}px`,
  tablet: `${TABLET_WIDTH}px`,
  laptop: `${LAPTOP_WIDTH}px`,
  laptopL: `${LAPTOP_L_WIDTH}px`,
  desktop: `${DESKTOP_WIDTH}px`,
};

export const breakpoints = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  mobileXL: `(min-width: ${size.mobileXL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const newColors = {
  black: '#181818',
  darkerGray: '#2F2F2F',
  darkGray: '#464646',
  gray: '#595959',
  lightGray: '#B5B3B3',
  lighterGray: '#DCDCDC',
  lightestGray: '#FAFAFA',
  white: '#FFFFFF',
  darkBlue: '#08294A',
  blue: '#0A3159',
  lightBlue: '#09C7E7',
  yellow: '#FFDF59',
  pink: '#CF3475',
  lightPink: '#DE5991',
};

const colorCodes = {
  // primary (darkblue)
  primary: '#08294A',
  lightPrimary: '#6C8FB2',
  extraLightPrimary: '#CFE4F9',

  // secondary (lightBlue)
  secondary: '#09C7E7',
  lightSecondary: '#A5EAF6',
  extraLightSecondary: '#CDF3FA',
  graySecondary: '#7C8CA1',

  // negative/error/cancel, reject and confirm
  red: '#EA5254',
  orange: '#E8841F',
  green: '#5BAF93',
  blue: '#0A7AE7',
  yellow: '#ffc069',
  redSecond: '#BC0000',

  // fontcolors
  fontPrimary: '#07294A',
  fontBlack: '#313234',
  fontLightBlack: '#393939',

  // borders
  borderGray: '#d9d9d9',

  // general
  white: '#FFFFFF',
  grayWhite: 'fbfbfb',
  lightGray: '#979797',
  gray: '#545455',
  blueGray: '#F2F6FA',
  lightBlue: '#0ac7e7',
  black: '#000000',

  // transparent
  transGray: 'rgba(84, 84, 85, 0.4)',

  // keep them at the end to overwrite others
  ...newColors,
};

// general colors
export const colors = {
  ...colorCodes,
  primaryText: colorCodes.fontLightBlack,
  links: colorCodes.secondary,
  placeholderText: colorCodes.graySecondary,
};

// shadows
export const shadows = {
  main: '0px 0px 24px rgba(0, 0, 0, 0.04)',
  card: '0px 0px 24px rgba(0, 0, 0, 0.04)',
  pic: '0px 2px 24px rgba(0, 0, 0, 0.215882)',
  stripeBorder: '0px 0px 0px 2px rgba(24, 144, 255, 0.2)',
  hostProfileCard:
    '0px 4px 4px rgba(128, 109, 109, 0.1), 0px -1px 4px rgba(128, 109, 109, 0.05)',
};

// borders
export const borders = {
  inputBox: `1px solid ${colors.graySecondary}`,
  divider: `1px solid ${colors.lightGray}`,
  stripeBorder: `1px solid ${colors.borderGray}`,
  error: `1px solid ${colors.red}`,
  lightDivider: '1px solid rgba(0, 0, 0, 0.1)',
  newInputBox: '1px solid rgba(224, 224, 224, 0.5)',
};

//  set colours for tags in the table
export const tagColors = {
  'Looking for host': colors.primary,
  'At host': colors.green,
  'Pending request': colors.orange,
  new: colors.lightGray,
};

//  set colours for tags in the table
export const bookingStatus = {
  pending: colors.orange,
  confirmed: colors.yellow,
  canceled: colors.red,
  completed: colors.blue,
  rejected: colors.pink,
  accepted: colors.lightBlue,
};

const spacings = {
  1: '5px',
  2: '10px',
  3: '15px',
  4: '20px',
  5: '30px',
  6: '40px',
  7: '60px',
  8: '80px',
  9: '120px',
  10: '160px',
  11: '240px',
  12: '320px',

  sideMenuWidth: '245px',
  headerHeight: '80px',
  FooterHeight: '400px',
  sideMenuLayout: {
    top: '80px',
    bottom: '80px',
  },
  outerMargin: '100px',
  innerMargin: '140px',
};

export default {
  size,
  breakpoints,
  colors,
  shadows,
  borders,
  tagColors,
  bookingStatus,
  spacings,
};
