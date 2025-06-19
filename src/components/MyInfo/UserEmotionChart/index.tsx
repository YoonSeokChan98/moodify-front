import { UserEmotionChartStyled } from './styled';

// chart.js
import { Line } from 'react-chartjs-2';
// Chart.js 기능들 불러오기
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from 'chart.js';
// 날짜 축을 사용하려면 필요함
import 'chartjs-adapter-date-fns';
import { ko } from 'date-fns/locale';
import { EmotionData } from '@/types';
// 차트 기능 등록
ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend, Filler);

interface UserEmotionChartProps {
  emotions: EmotionData[];
}

const UserEmotionChart = (props: UserEmotionChartProps) => {
  const { emotions } = props;

  // useEffect(() => {
  //   console.log('emotions:', emotions);
  // }, [emotions]);

  // 차트 데이터 생성
  const chartData: ChartData<'line', { x: Date; y: number }[]> = {
    datasets: [
      {
        label: '중립',
        data: emotions.map((e) => ({
          x: new Date(e.createdAt),
          y: e.neutral,
        })),
        borderColor: '#6B7280',
        backgroundColor: 'rgba(107, 114, 128, 0.2)',
      },
      {
        label: '행복',
        data: emotions.map((e) => ({
          x: new Date(e.createdAt),
          y: e.happy,
        })),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
      },
      {
        label: '슬픔',
        data: emotions.map((e) => ({
          x: new Date(e.createdAt),
          y: e.sad,
        })),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
      },
      {
        label: '화남',
        data: emotions.map((e) => ({
          x: new Date(e.createdAt),
          y: e.angry,
        })),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
      },
      {
        label: '두려움',
        data: emotions.map((e) => ({
          x: new Date(e.createdAt),
          y: e.fearful,
        })),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
      },
      {
        label: '혐오감',
        data: emotions.map((e) => ({
          x: new Date(e.createdAt),
          y: e.disgusted,
        })),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
      },
      {
        label: '놀람',
        data: emotions.map((e) => ({
          x: new Date(e.createdAt),
          y: e.surprised,
        })),
        borderColor: '#EC4899',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
      },
    ],
  };

  // 차트 옵션 설정 (디자인, 기능 등)
  const chartOptions: ChartOptions<'line'> = {
    // 반응형
    responsive: true,
    // 비율 고정 X (div 크기에 따라 변함)
    maintainAspectRatio: false,
    plugins: {
      // 차트 제목
      title: { display: true, text: '날짜별 감정 변화', font: { size: 16 } },
      legend: { display: true, position: 'top' },
    },
    elements: {
      line: {
        // 선을 부드럽게 곡선 처리
        tension: 0.4,
      },
    },
    scales: {
      // x축은 시간
      x: {
        type: 'time',
        time: {
          // 일 단위로 보기
          unit: 'day',
          // tooltipFormat: 'yyyy년 MM월 dd일',
          displayFormats: { day: 'yyyy년 MM월 dd일' },
        },
        adapters: { date: { locale: ko } } as any,
        // title: { display: true, text: '날짜' },
        ticks: {
          // 라벨 표시 활성화
          display: true,
          // 라벨 회전 최대 45도 (겹침 방지)
          maxRotation: 45,
          // 너무 많은 라벨은 자동 건너뜀
          autoSkip: true,
          // 최대 표시 라벨 개수 제한
          maxTicksLimit: 10,
          // 데이터 기반으로 라벨 생성
          // source: 'data',
        },
      },
      y: {
        // y축 0부터 시작
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
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </UserEmotionChartStyled>
  );
};
export default UserEmotionChart;
