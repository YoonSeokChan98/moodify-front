import dynamic from "next/dynamic";

// EmotionDiary 페이지를 동적 로드하며 SSR 비활성화
const EmotionDiaryPage = dynamic(() => import("@/components/EmotionDiary"), {
  ssr: false,
});
export default EmotionDiaryPage