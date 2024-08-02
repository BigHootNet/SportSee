import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { usePerformanceData } from '../hooks/usePerformanceData';
import '../styles/UserPerformanceChart.scss';

interface UserPerformanceChartProps {
    userId: string;
}

const UserPerformanceChart: React.FC<UserPerformanceChartProps> = ({ userId }) => {
    const numericUserId = parseInt(userId, 10); // Convert userId to number
    const { data, isLoading, error } = usePerformanceData(numericUserId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log("Performance data:", data);

    if (!data || !Array.isArray(data.data)) return <div>No data available</div>;

    // Format the data to be compatible with the RadarChart
    const formattedData = data.data.map((item) => ({
        ...item,
        kind: data.kind[item.kind],
    }));

    console.log("Formatted data:", formattedData);

    return (
        <div className="radarChart graph">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="80%" data={formattedData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="kind" tick={{ fontSize: 12, fill: "#FFFFFF" }} />
                    <Radar name="Performance" dataKey="value" stroke="none" fill="#FF0101B2" fillOpacity={0.8} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserPerformanceChart;
