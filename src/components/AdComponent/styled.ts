import styled from 'styled-components';

export const AdComponentStyled = styled.div`
  .AdComponentWrap {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 320px;
    background: linear-gradient(135deg, #ffffff, #f9fafb);
    border: 1px solid #e5e7eb;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    z-index: 1000;
    padding: 24px;
    box-sizing: border-box;
    font-family: 'Apple SD Gothic Neo', 'sans-serif';
    transition: all 0.3s ease-in-out;
  }

  .closeBtn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #6b7280;

    &:hover {
      color: #111827;
    }
  }

  .adContent {
    text-align: center;

    h3 {
      margin-bottom: 8px;
      font-size: 18px;
      color: #111827;
    }

    p {
      font-size: 14px;
      color: #4b5563;
      margin-bottom: 16px;
    }

    .ctaBtn {
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;

      &:hover {
        background-color: #1e40af;
      }
    }
  }
`;
