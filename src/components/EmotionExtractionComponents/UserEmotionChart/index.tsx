import { UserEmotionChartStyled } from './styled';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { EmotionType } from '@/types';
import { useEffect, useState } from 'react';
import { apiPostAddEmotion } from '@/pages/api/emotionApi';
import Cookies from 'js-cookie';
import { store } from '@/redux/store';
import { toast } from 'react-toastify';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserEmotionChart = ({ emotions }: EmotionType) => {
  const cookie = Cookies.get('userToken');
  console.log('🚀 ~ UserEmotionChart ~ item:', emotions);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const colors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(201, 203, 207, 0.5)',
  ];
  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(201, 203, 207, 1)',
  ];
  useEffect(() => {
    if (emotions === null) {
      setLabels(['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised']);
      setData([0, 0, 0, 0, 0, 0, 0]);
    }
    if (emotions) {
      setLabels(Object.keys(emotions));
      setData(Object.values(emotions));
    }
    if (cookie) {
      const handleAddEmotion = async () => {
        try {
          const userId = store.getState().user.userInfo?.userId;
          const response = await apiPostAddEmotion({ userId, emotions });
          if (response.result === true) {
            toast.success('분석한 감정이 저장되었습니다.');
          }
        } catch (error) {
          console.error(`감정 DB저장 에러: ${error}`);
        }
      };
      handleAddEmotion();
    }
  }, [emotions]);
  // object로 넘어온 감정 데이터를 배열로 변환
  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: '내 감정 그래프',
        data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: borderColors.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <UserEmotionChartStyled>
      <div className="userEmotionChartWrap">
        <Bar data={chartData} options={options} />
      </div>
    </UserEmotionChartStyled>
  );
};

export default UserEmotionChart;
