import React from 'react';

import { ListItem, BulletPoint } from '../Profile.style';

import { colors } from '../../../../theme';
// Icons
import Icon from '../../../Common/Icon';

export default ({ totalList, actualList }) => {
  // delete 'none of these' from total list
  if (totalList[totalList.length - 1] === 'None of these') totalList.pop();
  // also take it out from actual list
  const filteredActualList = actualList.filter(
    item => item !== 'None of these',
  );

  return totalList.map(item =>
    filteredActualList.includes(item) ? (
      <BulletPoint>
        <Icon fill={colors.pink} icon="circleTick" width="24px" height="24px" />
        <ListItem key={`accommodation-checklist-item-${Math.random()}`}>
          {item}
        </ListItem>
      </BulletPoint>
    ) : (
      <BulletPoint>
        <Icon
          fill={colors.blue}
          icon="crossCircle"
          width="24px"
          height="24px"
        />
        <ListItem key={`accommodation-checklist-item-${Math.random()}`}>
          {item}
        </ListItem>
      </BulletPoint>
    ),
  );
};
