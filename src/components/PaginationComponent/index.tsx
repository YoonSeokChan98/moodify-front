import { useEffect, useState } from 'react';
import { PaginationComponentStyled } from './styled';
import Link from 'next/link';

interface Props {
  // 데이터의 총 갯수
  totalItems: number;
  // 페이지 당 보여줄 데이터 갯수
  itemCountPerPage: number;
  // 보여줄 페이지의 갯수
  pageCount: number;
  // 현재 페이지
  currentPage: number;
}

const PaginationComponent = ({ totalItems, itemCountPerPage, pageCount, currentPage }: Props) => {
  // 총 페이지 갯수
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  // 시작 페이지
  const [start, setStart] = useState(1);
  // 이전 페이지가 없는 경우
  const noPrev = start === 1;
  // 다음 페이지가 없는 경우
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <PaginationComponentStyled>
      <div className="paginationComponentWrap">
        <ul>
          <li className={`${'move'} ${noPrev && 'invisible'}`}>
            <Link href={`?page+${start - 1}`}>이전</Link>
          </li>
          {[...Array(pageCount)].map((a, i) => (
            <>
              {start + i <= totalPages && (
                <li key={i}>
                  <Link href={`?page=${start + i}`} className={`page ${currentPage === start + i ? 'active' : ''}`}>
                    {start + i}
                  </Link>
                </li>
              )}
            </>
          ))}
          <li className={`${'move'} ${noNext && 'invisible'}`}>
            <Link href={`?page=${start + pageCount}`}>다음</Link>
          </li>
        </ul>
      </div>
    </PaginationComponentStyled>
  );
};

export default PaginationComponent;

// https://imdaxsz.tistory.com/37