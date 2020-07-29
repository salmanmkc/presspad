import React from 'react';

import Tabs from '../components/Common/Tabs';

export default {
  title: 'Tabs',
};
const items = ['my account', 'about me', 'my listing', 'verifications'];
const items1 = ['about me', 'my account'];
export const Tabs4ItemsComponent = () => <Tabs items={items} />;
export const Tabs2ItemsComponent = () => <Tabs items={items1} />;
