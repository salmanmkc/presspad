import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const Wrapper = styled.div`
  display: flex;
  padding-top: 10px;
`;

export const Link = styled.a``;

const FileDownload = ({ url, fileName, showIcon }) => {
  console.log('hello');
  return (
    <Wrapper>
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
};

export default FileDownload;
