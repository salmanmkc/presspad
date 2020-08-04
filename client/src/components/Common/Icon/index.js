import React from 'react';
import styled, { css, withTheme } from 'styled-components';

// social icons
import Facebook from './icons/Facebook';
import Instagram from './icons/Instagram';
import Linkedin from './icons/Linkedin';
import Twitter from './icons/Twitter';
import Youtube from './icons/Youtube';

// general icons
import Arrow from './icons/Arrow';
import Cross from './icons/Cross';
import Menu from './icons/Menu';
import Search from './icons/Search';
import Loading from './icons/Loading';
import Warning from './icons/Warning';
import CircleTick from './icons/CircleTick';
import MoreInfo from './icons/MoreInfo';
import User from './icons/User';
import CrossCircle from './icons/CrossCircle';
import Info from './icons/Info';
import MapPin from './icons/MapPin';
import Download from './icons/Download';
import Tick from './icons/Tick';
import Close from './icons/Close';
import QuestionCircle from './icons/QuestionCircle';
import QuestionMark from './icons/QuestionMark';
import MoneyBag from './icons/MoneyBag';
import CheckMark from './icons/CheckMark';
import ReviewExplanationMark from './icons/ReviewExplanationMark';
import ExplanationMarkCircle from './icons/ExplanationMarkCircle';
import Calendar from './icons/Calendar';
import Chevron from './icons/Chevron';
import UploadFile from './icons/UploadFile';
import Copy from './icons/Copy';
import AlertTriangle from './icons/AlertTriangle';
import Money from './icons/Money';
import Arrow2 from './icons/Arrow2';
import Flower from './icons/Flower';
import Hearts from './icons/Hearts';
import Star from './icons/Star';
import Ambassador from './icons/Ambassador';
import Community from './icons/Community';

const iconStyles = props => css`
  width: ${props.width || '100%'};
  height: ${props.height || '100%'};
  color: ${props.color};
  margin: ${props.margin || '0 0 0 0'};
  ${props.customStyle};
`;

const iconMap = {
  // social icons
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youTube: Youtube,
  // general icons
  arrow: Arrow,
  cross: Cross,
  tick: Tick,
  circleTick: CircleTick,
  crossCircle: CrossCircle,
  loading: Loading,
  menu: Menu,
  search: Search,
  waring: Warning,
  moreInfo: MoreInfo,
  user: User,
  info: Info,
  mapPin: MapPin,
  download: Download,
  close: Close,
  questionCircle: QuestionCircle,
  moneyBag: MoneyBag,
  checkMark: CheckMark,
  questionMark: QuestionMark,
  reviewExplanationMark: ReviewExplanationMark,
  explanationMarkCircle: ExplanationMarkCircle,
  calendar: Calendar,
  chevron: Chevron,
  uploadFile: UploadFile,
  copy: Copy,
  alertTriangle: AlertTriangle,
  money: Money,
  arrow2: Arrow2,
  flower: Flower,
  hearts: Hearts,
  star: Star,
  ambassador: Ambassador,
  community: Community,
};

const styledIconMap = Object.keys(iconMap).reduce((accum, curr) => {
  const IconSvg = iconMap[curr];

  if (!IconSvg) {
    throw new Error(`Icon ${curr} not found`);
  }

  // eslint-disable-next-line no-param-reassign
  accum[curr] = styled(IconSvg)(iconStyles);
  return accum;
}, {});

const Icon = ({ icon, color, fill, theme, customStyle, ...props }) => {
  if (!iconMap[icon]) {
    // eslint-disable-next-line no-console
    console.warn(`<Icon /> called with invalid icon prop "${icon}"`);
    return null;
  }
  const StyledIcon = styledIconMap[icon];

  return (
    <StyledIcon
      color={theme.colors[color] || color || fill || 'currentColor'}
      customStyle={customStyle}
      {...props}
    />
  );
};

export default withTheme(Icon);
