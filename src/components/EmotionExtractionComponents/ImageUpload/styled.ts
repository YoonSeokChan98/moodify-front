import styled from 'styled-components';

export const ImageUploadStyled = styled.div`
  .imageUploadWrap {
    /* border: 1px solid; */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
    .imageUploadImgBox {
      /* border: 1px solid; */
      width: 200px;
      height: 200px;
      .noneImgBox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .imageUploadImg {
        border-radius: 15px;
        width: 100%;
        height: 100%;
      }
    }
    .imageUploadControllerBox{
      /* border: 1px solid; */
    }
    .noneImage{
     
    margin: 0 auto;
    }
  }
`;
