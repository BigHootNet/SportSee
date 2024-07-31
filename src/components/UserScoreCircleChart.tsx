import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Cell } from 'recharts';
import '../styles/UserScoreCircleChart.scss';



interface UserScoreCircleChartProps {
  score: number;
}

const UserScoreCircleChart: React.FC<UserScoreCircleChartProps> = ({ score }) => {
  const data = [
    { name: 'Score', value: score * 100 },
    { name: 'Rest', value: 100 - score * 100 }
  ];

  return (
    <div className="radialBarChart graph">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="70%" outerRadius="90%" data={data} startAngle={90} endAngle={450}>
          <circle cx="50%" cy="50%" r="31%" fill="white" />
          <RadialBar dataKey="value" cornerRadius={10}>
            <Cell key="score" fill={'#E60000'} stroke="none" />
            <Cell key="rest" fill="transparent" stroke="none" />
          </RadialBar>
          <text x="50%" y="45%" dy={5} textAnchor="middle">
            <tspan className="radialBarChart-percentage">{`${Math.round(score * 100)}%`}</tspan>
            <tspan x="50%" dy={20} className="radialBarChart-text">de votre</tspan>
            <tspan x="50%" dy={20} className="radialBarChart-text">objectif</tspan>
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserScoreCircleChart;
