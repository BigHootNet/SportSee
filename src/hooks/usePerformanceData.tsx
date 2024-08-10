import { useState, useEffect } from 'react';
import { UserPerformance } from '../types/user';
import mockData from '../__mocks__/mockedData.json';
import { formatUserPerformance } from '../utils/formatData';

const usePerformanceData = (userId: number) => {
    const [data, setData] = useState<UserPerformance | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                let performanceData: UserPerformance | undefined;

                // Filtrer les données mockées pour ne récupérer que les données de performance
                const mockDataArray = mockData.filter(item => 'kind' in item) as UserPerformance[];

                performanceData = mockDataArray.find(perf => perf.userId === userId);

                if (!performanceData) {
                    // Si pas de données mockées, faire un fetch
                    const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
                    if (response.ok) {
                        const result = await response.json();
                        performanceData = result.data;
                    } else {
                        setError("Performance data not found");
                        return;
                    }
                }

                // Formater et afficher les données
                if (performanceData) {
                    const formattedData = formatUserPerformance([performanceData]);
                    setData(formattedData[0]);
                }
            } catch (error) {
                console.error("Error fetching performance data:", error);
                setError("Error fetching performance data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};

export default usePerformanceData;
