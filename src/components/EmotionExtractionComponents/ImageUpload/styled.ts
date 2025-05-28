import styled from 'styled-components';

export const ImageUploadStyled = styled.div`
  .imageUploadWrap {
    /* border: 1px solid; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 20vh;
    .imageUploadImgBox {
      /* border: 1px solid; */
      max-width: 400px;
      max-height: 400px;
      .imageUploadImg {
        border-radius: 15px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
`;
