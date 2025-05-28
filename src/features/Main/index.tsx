import Loading from '@/components/Loading';
import { MainStyled } from './styled';
import { Skeleton } from 'antd';

const Main = () => {
  return (
    <MainStyled>
      <div className="mainWrap">
        <div className="mainTitle">
          <div className="title1">Moodify</div>
          <div className="title2">감정으로 음악을 만들다.</div>
        </div>
      </div>
    </MainStyled>
  );
};

export default Main;
