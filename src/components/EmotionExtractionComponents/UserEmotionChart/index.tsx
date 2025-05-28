import { UserEmotionChartStyled } from './styled';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { EmotionType } from '@/types';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserEmotionChart = ({ item }: EmotionType) => {
  const [labels, setLabels] = useState<string[]>([
    'neutral',
    'happy',
    'sad',
    'angry',
    'fearful',
    'disgusted',
    'surprised',
  ]);
  const [data, setData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
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
    if (item) {
      setLabels(Object.keys(item));
      setData(Object.values(item));
    }
  }, [item]);
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
        <Bar  data={chartData} options={options} />
      </div>
    </UserEmotionChartStyled>
  );
};

export default UserEmotionChart;
