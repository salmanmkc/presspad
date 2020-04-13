import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const Wrapper = styled.div`
  display: flex;
  padding-top: 10px;
`;

export const Link = styled.a`
  margin-right: 10px;
`;

const FileDownload = ({ url, fileName }) => {
  console.log('hello');
  return (
    <Wrapper>
      <Link type="button" as="a" href={url} download>
        {fileName}
      </Link>
      <Icon icon="download" width="15px" height="15px" color="lightBlue" />
      <Icon
        icon="cross"
        width="15px"
        height="15px"
        color="pink"
        margin="0 0 0 10px"
      />
    </Wrapper>
  );
};

export default FileDownload;
