import { useState, useEffect } from 'react';
import { UserActivity } from '../types/user';
import { MOCK_USER_ACTIVITY } from '../__mocks__/mockedData';
import { formatUserActivity } from '../utils/formatData';

export const useUserActivity = (userId: number) => {
    const [data, setData] = useState<UserActivity | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Vérifier les données mockées d'abord
                const mockData = MOCK_USER_ACTIVITY.find(activity => activity.userId === userId);
                if (mockData) {
                    const formattedData = formatUserActivity([mockData]);
                    setData(formattedData[0]);
                    setIsLoading(false);
                    return;
                }

                // Si pas de données mockées, faire un fetch
                const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
                if (response.ok) {
                    const result = await response.json();
                    const formattedData = formatUserActivity([result.data]);
                    setData(formattedData[0]);
                } else {
                    setError("User activity not found");
                }
            } catch (error) {
                setError("Error fetching user activity");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
