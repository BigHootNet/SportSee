import { useState, useEffect } from 'react';
import { UserPerformance } from '../types/user';
import { MOCK_USER_PERFORMANCE } from '../__mocks__/mockedData';

export const usePerformanceData = (userId: number) => {
    const [data, setData] = useState<UserPerformance | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                const apiData: UserPerformance = result.data;
                console.log("API data:", apiData);
                setData(apiData);
            } catch (apiError) {
                console.error("Error fetching performance data from API:", apiError);
                const mockData = MOCK_USER_PERFORMANCE.find(performance => performance.userId === userId);
                console.log("Mock data:", mockData);
                if (mockData) {
                    setData(mockData);
                } else {
                    setError("Performance data not found");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
