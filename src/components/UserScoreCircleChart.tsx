import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '../styles/UserScoreCircleChart.scss';

interface UserScoreCircleChartProps {
  score: number;
}

const UserScoreCircleChart: React.FC<UserScoreCircleChartProps> = ({ score }) => {
  const scoreData = [{ name: 'score', value: score }, { name: 'remainder', value: 1 - score }];

  return (
    <div className="radialBarChart graph">
      <h2 className="chart-title">Score</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={scoreData}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            innerRadius="70%"
            outerRadius="80%"
            fill="#FF0000"
            stroke="none"
          >
            <Cell key="score" fill="#FF0000" />
            <Cell key="remainder" fill="#FBFBFB" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="radialBarChart-label">
        <p className="radialBarChart-percentage">{`${score * 100}%`}</p>
        <p className="radialBarChart-text">de votre objectif</p>
      </div>
    </div>
  );
};

export default UserScoreCircleChart;
