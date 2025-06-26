import { UserEmotionChartStyled } from './styled';

// chart.js
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
// Chart.js 기능들 불러오기
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
// 날짜 축을 사용하려면 필요함
import 'chartjs-adapter-date-fns';
import { EmotionData } from '@/types';
import { useEffect, useState } from 'react';
import { store } from '@/redux/store';
// 차트 기능 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale);

interface UserEmotionChartProps {
  emotions: EmotionData[];
}

const UserEmotionChart = (props: UserEmotionChartProps) => {
  const { emotions } = props;
  const user = store.getState().user?.userInfo;
  const membership = user?.userMembershipStatus.membershipName;

  const formDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

  const now = new Date();
  const isPremium = membership === 'premium';

  // 날짜 오름차순 정렬 및 필터링 // 이거 다시 공부하기
  const filteredEmotions = emotions.filter((e) => {
    if (isPremium) return true;
    const createdAt = new Date(e.createdAt);
    const sevenDaysLater = new Date(createdAt);
    sevenDaysLater.setDate(createdAt.getDate() + 7);
    return sevenDaysLater >= now;
  });
  // 날짜 오름차순 정렬
  const sortedEmotions = [...filteredEmotions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const labels = sortedEmotions.map((e) => formDate(e.createdAt));
  // 차트 데이터 생성
  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: '중립',
        data: sortedEmotions.map((e) => e.neutral),
        // borderColor: '#6B7280',
        backgroundColor: 'rgba(107, 114, 128, 0.2)',
      },
      {
        label: '행복',
        data: sortedEmotions.map((e) => e.happy),
        // borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
      },
      {
        label: '슬픔',
        data: sortedEmotions.map((e) => e.sad),
        // borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
      },
      {
        label: '화남',
        data: sortedEmotions.map((e) => e.angry),
        // borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
      },
      {
        label: '두려움',
        data: sortedEmotions.map((e) => e.fearful),
        // borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
      },
      {
        label: '혐오감',
        data: sortedEmotions.map((e) => e.disgusted),
        // borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
      },
      {
        label: '놀람',
        data: sortedEmotions.map((e) => e.surprised),
        // borderColor: '#EC4899',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
      },
    ],
  };

  // 차트 옵션 설정 (디자인, 기능 등)
  const chartOptions: ChartOptions<'bar'> = {
    // 반응형
    responsive: true,
    // 비율 고정 X (div 크기에 따라 변함)
    maintainAspectRatio: false,
    plugins: {
      // 차트 제목
      title: { display: true, text: '날짜별 감정 변화', font: { size: 16 } },
      legend: { display: true, position: 'top' },
    },
    scales: {
      x: {
        type: 'category',
        ticks: {
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
        max: 1,
        title: { display: true, text: '감정 점수' },
      },
    },
  };

  return (
    <UserEmotionChartStyled>
      <div className="UserEmotionChartWrap">
        <div className="title">감정 데이터 분석</div>
        <div className="emotionChart">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </UserEmotionChartStyled>
  );
};
export default UserEmotionChart;
