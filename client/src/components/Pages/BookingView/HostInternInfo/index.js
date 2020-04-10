import React from 'react';
import { Spin } from 'antd';

import { H2, H3, H7C, PS, PSBold } from '../../../Common/Typography';
import { Wrapper, InfoLine, BioWrapper } from './HostInternInfo.style';

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
            if (key === 'role' || key === 'bio' || !info[key]) {
              return null;
            }
            return (
              <InfoLine key={key}>
                <H7C color="lightGray">{key}</H7C>
                <PSBold color="darkerGray">{info[key]}</PSBold>
              </InfoLine>
            );
          })}
          {info.bio && (
            <BioWrapper>
              <H3 color="darkerGray">Bio</H3>
              <PS color="gray">{info.bio}</PS>
            </BioWrapper>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default HostInternInfo;
