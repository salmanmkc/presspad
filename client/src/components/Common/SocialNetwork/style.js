import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 100%;
  min-height: 130px;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: ${({ mobile }) =>
    mobile ? 'right top' : 'right bottom'};
`;

export const InnerWrapper = styled.section`
  width: ${({ mobile }) => (mobile ? '100%' : '90%')};
  width: 90%;
  display: flex;
  flex-direction: column;
`;

export const SocialIcons = styled.div`
  margin-top: 1rem;
  width: 65%;
  display: flex;
  justify-content: space-between;
`;
