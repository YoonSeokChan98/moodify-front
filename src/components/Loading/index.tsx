import { Spin } from 'antd';
import { LoadingStyled } from './styled';

const Loading = () => {
  const contentStyle: React.CSSProperties = {
    padding: 100,
    background: '',
    borderRadius: 0,
  };

  const content = <div style={contentStyle} />;
  return (
    <LoadingStyled>
      <div className="loadingWrap">
        {/* <Skeleton active paragraph={{ rows: 4 }} /> */}
        {/* <Skeleton active /> */}
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
        {/* <div>로딩중입니다.</div>
        <div>잠시만 기달려주세요.</div> */}
      </div>
    </LoadingStyled>
  );
};

export default Loading;
