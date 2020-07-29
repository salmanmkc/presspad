import React, { useState } from 'react';
import { Collapse } from 'antd';
import { H5C, H7C, H6C } from '../Typography';
import { FAQWrapper, HeaderLine } from './style';
import { MOBILE_XL_WIDTH } from '../../../constants/screenWidths';

const { Panel } = Collapse;

const FAQ = props => {
  const { title, content, colorChevron, size = 'desktop' } = props;

  const [open, setOpen] = useState(false);
  const isMobile = window.innerWidth <= MOBILE_XL_WIDTH;

  const decideHeaderColor = () => (open ? 'lightBlue' : 'blue');

  const HeaderComponent = {
    mobile: H6C,
    mobileSmall: H7C,
    desktop: H5C,
  };
  const Header = HeaderComponent[size];

  const renderHeader = () => (
    <>
      <Header style={{ marginLeft: '0.5rem' }} color={decideHeaderColor()}>
        {title}
      </Header>
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
          <p>
            A dog is a type of domesticated animal. Known for its loyalty and
            faithfulness, it can be found:a welcome guest in many households
            across the world.
          </p>
        </Panel>
      </Collapse>
    </FAQWrapper>
  );
};

export default FAQ;
