import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const Wrapper = styled.div`
  display: flex;
  margin: ${({ margin }) => margin || '0 0 0 0'};
`;

export const Link = styled.a``;

const FileDownload = ({ url, fileName, showIcon, margin }) => (
  <Wrapper margin={margin}>
    <Link type="button" as="a" href={url} download>
      {showIcon && (
        <Icon
          icon="download"
          width="15px"
          height="15px"
          color="lightBlue"
          margin="0 10px 0 0"
        />
      )}
      {fileName}
    </Link>
  </Wrapper>
);

export default FileDownload;
