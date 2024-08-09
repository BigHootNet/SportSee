import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle, TooltipProps } from 'recharts';
import { useAverageSessions } from '../hooks/useAverageSessions';
import { formatUserAverageSessionsData } from '../utils/formatData';
import '../styles/UserAverageSessionsChart.scss';

interface UserAverageSessionsChartProps {
  userId: string;
}

interface CustomCursorProps {
  points: { x: number; y: number }[];
  height: number;
  width: number;
}

const UserAverageSessionsChart: React.FC<UserAverageSessionsChartProps> = ({ userId }) => {
  const numericUserId = parseInt(userId, 10);
  const { data, isLoading, error } = useAverageSessions(numericUserId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || !data.sessions) return <div>No data available</div>;

  const { sessionsWithLabels, maxSessionLength, minSessionLength } = formatUserAverageSessionsData(data);

  // CustomCursor Component Logic
  const CustomCursor: React.FC<CustomCursorProps> = ({ points, height, width }) => {
    if (!points || points.length === 0) return null;
    const { x } = points[0];

    return (
      <g>
        <Rectangle
          x={x}
          y={1}
          width={width - x}
          height={height - 2}
          fill="#000000"
          fillOpacity={0.2}
        />
      </g>
    );
  };

  // Custom Tooltip Logic
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="lineChart graph">
      <h2 className="chart-title">Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sessionsWithLabels} margin={{ top: 80, right: 0, left: 0, bottom: 30 }}>
          <XAxis
            dataKey="dayLabel"
            tick={{ fill: '#FFFFFF', opacity: '0.8' }}
            tickLine={false}
            axisLine={false}
            interval={0}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            dataKey="sessionLength"
            unit="min"
            hide={true}
            domain={[Math.floor(minSessionLength * 0.9), Math.ceil(maxSessionLength * 1.1)]}
          />
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor points={[{ x: 0, y: 0 }]} height={300} width={300} />} />
          <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserAverageSessionsChart;
