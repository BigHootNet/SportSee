import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { usePerformanceData } from '../hooks/usePerformanceData';
import '../styles/UserPerformanceChart.scss';

interface UserPerformanceChartProps {
    userId: string;
}

const UserPerformanceChart: React.FC<UserPerformanceChartProps> = ({ userId }) => {
    const { data, isLoading, error } = usePerformanceData(userId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="radarChart graph">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="80%" data={data} >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="kind" tick={{ fontSize: 12, fill: "#FFFFFF" }} />
                    <Radar name="Performance" dataKey="value" stroke="none" fill="#FF0101B2" fillOpacity={0.8} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserPerformanceChart;
