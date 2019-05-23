import styled from "styled-components";

export const PageWrapper = styled.div`
  padding-top: 4rem;
`;

export const ContentWrapper = styled.div`
  max-width: 1140px;
  width: 80%;
  margin: 0 auto;
`;

export const HeaderWrapper = styled.div`
  margin-top: 50px;
`;

export const HiText = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  color: #07294a;
  margin-bottom: 14px;
`;

export const AddProfilePhotoButton = styled.div``;

export const Section = styled.div``;

export const SectionTitile = styled.h4`
  margin: 20px auto;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  color: #353942;
`;

export const SectionWrapperContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.04);
  padding: 25px;
`;

export const Label = styled.label`
  font-family: Roboto;
  font-style: normal;
  font-weight: ${({ light }) => (light ? "lighter" : "bold")};
  font-size: 16px;
  line-height: 25px;
  color: #393939;
  display: block;
`;

export const UploadText = styled.button`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #0ac7e7;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const PhotoWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ small }) => (small ? "calc( 50% - 12.5px)" : "257px")};
  
  margin-${({ direction }) => direction}: 12.5px;

  @media (max-width: 575.98px) { 
    height: 257px;
    margin: 0
    margin-bottom:12.5px;
   }

  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageSrc }) =>
    imageSrc ? `url(${imageSrc})` : "none"};
`;

export const UploadButton = styled.button`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: #0ac7e7;
  padding: 7px;
  cursor: pointer;
`;
