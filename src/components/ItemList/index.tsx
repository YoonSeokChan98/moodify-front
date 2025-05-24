import { useEffect, useState } from 'react';
import ItemCard from './Item/index';
import { ItemListStyled } from './styled';
import { Col, Row } from 'antd';

interface testData {
  itemTitle: string;
  itemContent: string;
}

const ItemList = () => {
  const [items, setItems] = useState<testData[]>([]);
  useEffect(() => {
    // test
    const itemDataArray: testData[] = [];
    for (let i = 0; i < 10; i++) {
      const itemData = {
        itemTitle: `${i}번 아이템 이름`,
        itemContent: `${i}번 아이템 내용`,
      };
      itemDataArray.push(itemData);
    }
    setItems(itemDataArray);
  }, []);

  return (
    <ItemListStyled>
      <div className="itemListWrap">
        {items?.length > 0 ? (
          items?.map((x: any, i: number) => <ItemCard key={i} item={x} />)
        ) : (
          <div>작성된 글이 없습니다.</div>
        )}
      </div>
    </ItemListStyled>
  );
};

export default ItemList;
