import React from 'react';
import { Spin } from 'antd';

import { H2, H7C, PSBold } from '../../../Common/Typography';
import { Wrapper, InfoLine } from './HostInternInfo.style';

const HostInternInfo = ({ info, isLoading }) => {
  const { name, role } = info;
  return (
    <Wrapper>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <H7C color="lightGray" mb="2">
            your {role}
          </H7C>
          <H2 color="blue" mb="5">
            {name}
          </H2>
          {Object.keys(info).map(key => {
            if (key === 'role' || !info[key]) {
              return null;
            }
            return (
              <InfoLine>
                <H7C color="lightGray">{key}</H7C>
                <PSBold color="darkerGray">{info[key]}</PSBold>
              </InfoLine>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

export default HostInternInfo;
