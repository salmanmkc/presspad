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
          {Object.entries(info).map(([key, value]) => {
            if (key === 'role' || key === 'bio' || key === 'name' || !value) {
              return null;
            }
            if (key === 'address') {
              const { addressline1, addressline2, postcode, city } = value;
              return (
                <InfoLine key={key}>
                  <H7C color="lightGray">{key}</H7C>
                  <div>
                    {addressline1 && (
                      <PSBold color="darkerGray">{addressline1}</PSBold>
                    )}
                    {addressline2 && (
                      <PSBold color="darkerGray">{addressline2}</PSBold>
                    )}
                    <PSBold color="darkerGray">{`${city}, ${postcode}`}</PSBold>
                  </div>
                </InfoLine>
              );
            }
            return (
              <InfoLine key={key}>
                <H7C color="lightGray">{key.replace(/_/g, ' ')}</H7C>
                <PSBold color="darkerGray">{value}</PSBold>
              </InfoLine>
            );
          })}
          {info.bio && (
            <BioWrapper userRole={role}>
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
