import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle, TooltipProps } from 'recharts';
import { useAverageSessions } from '../hooks/useAverageSessions';
import '../styles/UserAverageSessionsChart.scss';

const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface UserAverageSessionsChartProps {
  userId: string;
}

interface Session {
  day: number;
  sessionLength: number;
}

interface CustomCursorProps {
  points: { x: number; y: number }[];
  height: number;
  width: number;
}

const UserAverageSessionsChart: React.FC<UserAverageSessionsChartProps> = ({ userId }) => {
  const { sessions, isLoading, error } = useAverageSessions(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const dataWithLabels = sessions.map((session: Session) => ({
    ...session,
    dayLabel: days[session.day - 1]
  }));

  const getMaxSessionLength = () => Math.max(...sessions.map(session => session.sessionLength));
  const getMinSessionLength = () => Math.min(...sessions.map(session => session.sessionLength));

  const maxSessionLength = getMaxSessionLength();
  const minSessionLength = getMinSessionLength();

  // CustomCursor Component Logic
  const CustomCursor: React.FC<CustomCursorProps> = ({ points, height, width }) => {
    if (!points || points.length === 0) return null;
    const { x } = points[0];

    return (
      <g>
        <Rectangle
          x={x}
          y={1} // Adjust the starting y position slightly
          width={width - x}
          height={height - 2} // Adjust the height to ensure it fits within the chart
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
        <LineChart data={dataWithLabels} margin={{ top: 80, right: 0, left: 0, bottom: 30 }}>
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
