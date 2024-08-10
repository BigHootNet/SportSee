import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LegendProps, TooltipProps } from 'recharts';
import { useUserActivity } from '../hooks/useUserActivity';
import '../styles/UserActivityChart.scss';

interface UserActivityChartProps {
  userId: string;
}

interface CustomLegendPayload {
  color?: string;
  value: string | number;
}

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  return (
    <div className="custom-legend">
      {payload && payload.map((entry: CustomLegendPayload, index: number) => (
        <div key={`item-${index}`} className="legend-item">
          <span className="legend-icon" style={{ backgroundColor: entry.color || '' }}></span>
          <span style={{ color: entry.color || '' }}>
            {entry.value === 'Poids (kg)' ? 'Poids (kg)' : 'Calories brûlées (kCal)'}
          </span>
        </div>
      ))}
    </div>
  );
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#FF0000', padding: '10px', borderRadius: '5px', color: '#FFFFFF' }}>
        <p>{`${payload[0].value} kg`}</p>
        <p>{`${payload[1].value} kCal`}</p>
      </div>
    );
  }

  return null;
};

const UserActivityChart: React.FC<UserActivityChartProps> = ({ userId }) => {
  const { data, isLoading, error } = useUserActivity(parseInt(userId, 10));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || !data.sessions) return <div>No data available</div>;

  const sessions = data.sessions;

  const minKilogram = Math.min(...sessions.map(session => session.kilogram)) - 2;
  const maxKilogram = Math.max(...sessions.map(session => session.kilogram)) + 2;
  const maxCalories = Math.max(...sessions.map(session => session.calories)) + 50;

  const yAxisTicks = [minKilogram, (minKilogram + maxKilogram) / 2, maxKilogram];

  return (
    <>
      <div className="custom-bar-chart">
        <h2 className="chart-title">Activité quotidienne</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="horizontal"
            data={sessions} // Utilisation des données formatées
            barCategoryGap="40%"
            barGap={0}
            margin={{ top: 20, left: 10, bottom: 30, right: 10 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis 
              type="category" 
              dataKey="day" 
              tickMargin={10} 
              padding={{ left: -42, right: -42 }}
            />
            <YAxis 
              yAxisId="kilogram"
              type="number" 
              domain={[minKilogram, maxKilogram]} 
              ticks={yAxisTicks}
              hide={false} 
              orientation="right" 
              tickMargin={40}
            />
            <YAxis 
              yAxisId="calories"
              type="number" 
              domain={[0, maxCalories]} 
              hide={true} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              content={<CustomLegend />} 
              align="right" 
              verticalAlign="top" 
              iconType="circle" 
              wrapperStyle={{ lineHeight: '1vh', paddingBottom: '4vh' }}
            />
            <Bar yAxisId="kilogram" dataKey="kilogram" fill="#282D30" name="Poids (kg)" radius={[10, 10, 0, 0]} maxBarSize={7} />
            <Bar yAxisId="calories" dataKey="calories" fill="#E60000" name="Calories brûlées (kCal)" radius={[10, 10, 0, 0]} maxBarSize={7} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default UserActivityChart;