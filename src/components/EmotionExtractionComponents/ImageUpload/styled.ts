import styled from 'styled-components';

export const ImageUploadStyled = styled.div`
  .imageUploadWrap {
    /* border: 1px solid; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 20vh;
    .imageUploadControllerBox {
      text-align: start;
      .imageUploadBtn {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
      }
    }
    .imageUploadImgBox {
      /* border: 1px solid; */
      width: 300px;
      height: 300px;
      .imageUploadImg {
        border-radius: 15px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .loadingBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
