import { useState, useEffect } from 'react';

interface PerformanceData {
    value: number;
    kind: string;
}

export const usePerformanceData = (userId: string) => {
    const [data, setData] = useState<PerformanceData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                const reorganizedData = result.data.data.map((item: { value: number; kind: number }) => {
                    const kindMap: { [key: number]: string } = {
                        1: 'Intensité',
                        2: 'Vitesse',
                        3: 'Force',
                        4: 'Endurance',
                        5: 'Énergie',
                        6: 'Cardio'
                    };
                    return { 
                        value: item.value, 
                        kind: kindMap[item.kind] || 'Inconnu'
                    };
                }).sort((a: PerformanceData, b: PerformanceData) => {
                    const order = ["Intensité", "Vitesse", "Force", "Endurance", "Énergie", "Cardio"];
                    return order.indexOf(a.kind) - order.indexOf(b.kind);
                });
                setData(reorganizedData);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
