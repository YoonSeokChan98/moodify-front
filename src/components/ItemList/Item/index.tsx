import { ItemCardStyled } from './styled';

const ItemCard = (item: any, key: number) => {
  const { itemTitle, itemContent } = item.item;
  return (
    <ItemCardStyled>
      <div className="itemCardWrap">
        <div className="itemCardTitle">
          <div>{itemTitle}</div>
        </div>
        <div className="itemCardContent">
          <div>{itemContent}</div>
        </div>
      </div>
    </ItemCardStyled>
  );
};

export default ItemCard;
