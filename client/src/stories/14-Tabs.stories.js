import React from 'react';

import Tabs from '../components/Common/Tabs';

export default {
  title: 'Tabs',
};
const items = ['my account', 'about me', 'my listing', 'verifications'];
export const TabsComponent = () => <Tabs items={items} />;
