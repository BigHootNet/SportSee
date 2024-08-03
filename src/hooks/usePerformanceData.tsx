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

            let apiData: UserPerformance | null = null;
            let mockData: UserPerformance | undefined = undefined;

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
                if (response.ok) {
                    const result = await response.json();
                    apiData = result.data;
                }
            } finally {
                if (!apiData) {
                    mockData = MOCK_USER_PERFORMANCE.find(performance => performance.userId === userId);
                    if (mockData) {
                        setData(mockData);
                    } else {
                        setError("Performance data not found");
                    }
                } else {
                    setData(apiData);
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
