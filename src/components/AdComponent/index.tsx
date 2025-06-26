import { useState } from 'react';
import { AdComponentStyled } from './styled';
import { CloseOutlined } from '@ant-design/icons';

const AdComponent = () => {
  const [status, setStatus] = useState(true);

  const handleAd = () => {
    setStatus(false);
  };
  const handleClick = () => {
    alert('개발중');
  };

  return (
    <AdComponentStyled>
      {status && (
        <div className="AdComponentWrap">
          <button className="closeBtn" onClick={handleAd}>
            <CloseOutlined />
          </button>
          <div className="adContent">
            <h3>🎉 지금 가입하면 혜택이!</h3>
            <p>프리미엄 멤버십 최대 50% 할인 중</p>
            <button className="ctaBtn" onClick={handleClick}>
              자세히 보기
            </button>
          </div>
        </div>
      )}
    </AdComponentStyled>
  );
};

export default AdComponent;
