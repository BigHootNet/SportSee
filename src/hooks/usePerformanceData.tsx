import { useState, useEffect } from 'react';
import { UserPerformance } from '../types/user';
import { MOCK_USER_PERFORMANCE } from '../__mocks__/mockedData';
import { formatUserPerformance } from '../utils/formatData';

export const usePerformanceData = (userId: number) => {
    const [data, setData] = useState<UserPerformance | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Vérifier les données mockées d'abord
                const mockData = MOCK_USER_PERFORMANCE.find(performance => performance.userId === userId);
                if (mockData) {
                    const formattedData = formatUserPerformance([mockData]);
                    setData(formattedData[0]);
                    setIsLoading(false);
                    return;
                }

                // Si pas de données mockées, faire un fetch
                const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
                if (response.ok) {
                    const result = await response.json();
                    const formattedData = formatUserPerformance([result.data]);
                    setData(formattedData[0]);
                } else {
                    setError("Performance data not found");
                }
            } catch (error) {
                setError("Error fetching performance data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
