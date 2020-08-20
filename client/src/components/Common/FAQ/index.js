import React, { useState } from 'react';
import { Collapse } from 'antd';
import { H5C, H7C, H6C, P } from '../Typography';
import Icon from '../Icon';
import { FAQWrapper, HeaderLine, HeaderWrapper } from './style';
import {
  MOBILE_XL_WIDTH,
  MOBILE_M_WIDTH,
} from '../../../constants/screenWidths';
import { withWindowWidth } from '../../../HOCs';

const { Panel } = Collapse;

const FAQ = props => {
  const { title, content, colorChevron, windowWidth } = props;
  let size = 'desktop';
  if (windowWidth <= MOBILE_XL_WIDTH) {
    size = 'mobile';
  } else if (windowWidth <= MOBILE_M_WIDTH) {
    size = 'mobileSmall';
  }

  const [open, setOpen] = useState(false);
  const isMobile = window.innerWidth <= MOBILE_XL_WIDTH;

  const setTitleColor = () => (open ? 'lightBlue' : 'blue');

  const setTChevronColor = () => (open ? 'lightBlue' : colorChevron || 'blue');

  const HeaderComponent = {
    desktop: H5C,
    mobile: H6C,
    mobileSmall: H7C,
  };
  const Header = HeaderComponent[size];

  const chevronSizes = {
    desktop: 40,
    mobile: 30,
    mobileSmall: 20,
  };

  const renderHeader = () => (
    <>
      <HeaderWrapper>
        <Header
          style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
          color={setTitleColor()}
        >
          {title}
        </Header>
        <div>
          <Icon
            icon="arrow"
            direction={open ? 'up' : 'down'}
            color={setTChevronColor()}
            width={chevronSizes[size]}
          />
        </div>
      </HeaderWrapper>
      {!open && <HeaderLine />}
    </>
  );

  return (
    <FAQWrapper isMobile={isMobile}>
      <Collapse
        style={{ border: 'none', background: 'white' }}
        expandIconPosition="right"
        onChange={() => setOpen(!open)}
      >
        <Panel
          style={{ marginBottom: '2rem' }}
          header={renderHeader()}
          showArrow={false}
        >
          <P>{content}</P>
        </Panel>
      </Collapse>
    </FAQWrapper>
  );
};

export default withWindowWidth(FAQ);
