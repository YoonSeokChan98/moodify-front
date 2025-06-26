import { websiteTitle } from '@/assets';
import { MainStyled } from './styled';
import BoardList from '@/components/BoardComponent/BoardList';
import MainTitle from '@/components/MainTitle';

const Main = () => {
  return (
    <MainStyled>
      <div className="mainWrap">
        <MainTitle />
        <BoardList />
      </div>
    </MainStyled>
  );
};

export default Main;
