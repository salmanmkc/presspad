import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../components/Common/ButtonNew';

export default {
  title: 'Button',
  component: Button,
};

const Wrapper = ({ children }) => (
  <div style={{ textAlign: 'center', margin: '5rem' }}>{children}</div>
);
export const Primary = () => (
  <Wrapper>
    <Button type="primary" onClick={action('clicked')}>
      Large Button
    </Button>
  </Wrapper>
);
export const PrimaryWithBgColor = () => (
  <Wrapper>
    <Button type="primary" bgColor="yellow" onClick={action('clicked')}>
      Large Button
    </Button>
  </Wrapper>
);
export const PrimaryWithBgColorAndTextColor = () => (
  <Wrapper>
    <Button
      type="primary"
      bgColor="yellow"
      textColor="darkerGray"
      onClick={action('clicked')}
    >
      Large Button
    </Button>
  </Wrapper>
);

export const PrimarySmall = () => (
  <Wrapper>
    <Button type="primary" small onClick={action('clicked')}>
      Small
    </Button>
  </Wrapper>
);

export const PrimaryOutline = () => (
  <Wrapper>
    <Button type="primary" outline onClick={action('clicked')}>
      Outline
    </Button>
  </Wrapper>
);

export const PrimaryDisabled = () => (
  <Wrapper>
    <Button type="primary" disabled onClick={action('clicked')}>
      Outline
    </Button>
  </Wrapper>
);

export const PrimaryLoading = () => (
  <Wrapper>
    <Button type="primary" loading onClick={action('clicked')}>
      Outline
    </Button>
  </Wrapper>
);

export const Secondary = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="secondary">
      Secondary
    </Button>
  </Wrapper>
);

export const Tertiary = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="tertiary">
      Tertiary
    </Button>
  </Wrapper>
);
export const SecondarySmall = () => (
  <Wrapper>
    <Button onClick={action('clicked')} small type="secondary">
      Secondary
    </Button>
  </Wrapper>
);

export const SecondaryOutline = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="secondary" outline>
      Secondary
    </Button>
  </Wrapper>
);

export const SecondaryOutlineSmall = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="secondary" small outline>
      Secondary
    </Button>
  </Wrapper>
);

export const TertiaryOutline = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="tertiary" outline>
      outline
    </Button>
  </Wrapper>
);

export const TertiaryOutlineSmall = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="tertiary" small outline>
      small
    </Button>
  </Wrapper>
);

export const WithMargins = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="tertiary" mt="6">
      small
    </Button>
  </Wrapper>
);

export const withGraphic = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="tertiary" withGraphic>
      APPLY FOR BURSARY
    </Button>
  </Wrapper>
);

export const LinkButton = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="link">
      APPLY FOR BURSARY
    </Button>
  </Wrapper>
);

export const DeleteButton = () => (
  <Wrapper>
    <Button onClick={action('clicked')} type="delete">
      APPLY FOR BURSARY
    </Button>
  </Wrapper>
);
