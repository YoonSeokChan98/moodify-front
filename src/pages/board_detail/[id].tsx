import dynamic from "next/dynamic";

// 전체 페이지를 클라이언트 사이드 렌더링으로 전환
const BoardDetailPage = dynamic(() => import("@/components/BoardComponent/BoardDetail"), {
  ssr: false,
});

export default BoardDetailPage;
