import { useState, useEffect } from 'react';
import { UserAverageSessions } from '../types/user';
import { MOCK_USER_AVERAGE_SESSIONS } from '../__mocks__/mockedData';
import { formatUserAverageSessions } from '../utils/formatData';

export const useAverageSessions = (userId: number) => {
    const [data, setData] = useState<UserAverageSessions | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Vérifier les données mockées d'abord
                const mockData = MOCK_USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
                if (mockData) {
                    const formattedData = formatUserAverageSessions([mockData]);
                    setData(formattedData[0]);
                    setIsLoading(false);
                    return;
                }

                // Si pas de données mockées, faire un fetch
                const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
                if (response.ok) {
                    const result = await response.json();
                    const formattedData = formatUserAverageSessions([result.data]);
                    setData(formattedData[0]);
                } else {
                    setError("Average sessions not found");
                }
            } catch (error) {
                setError("Error fetching average sessions");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
