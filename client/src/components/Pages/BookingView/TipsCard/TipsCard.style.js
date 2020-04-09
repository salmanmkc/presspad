import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 410px;
  height: 219px;
  margin: 0 auto;
  padding: ${({ theme: { spacings } }) => `${spacings[4]} ${spacings[4]}`};
  box-shadow: ${({ theme }) => theme.shadows.card};
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    padding: ${({ theme: { spacings } }) => `${spacings[4]} ${spacings[5]}`};
    margin: unset;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme: { spacings } }) => spacings[4]};
`;

export const ItemLi = styled.li`
  display: flex;
  align-items: center;

  ::before {
    content: '';
    display: inline-block;
    margin-right: ${({ theme: { spacings } }) => spacings[4]};
    width: 16px;
    height: 16px;
    border: 1px solid ${({ theme }) => theme.colors.darkerGray};
    border-radius: 50%;
  }
`;
