import { useState, useEffect } from 'react';
import { UserAverageSessions } from '../types/user';
import { MOCK_USER_AVERAGE_SESSIONS } from '../__mocks__/mockedData';

export const useAverageSessions = (userId: number) => {
    const [data, setData] = useState<UserAverageSessions | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            // Vérifier les données mockées d'abord
            const mockData = MOCK_USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
            if (mockData) {
                setData(mockData);
                setIsLoading(false);
                return;
            }

            // Si pas de données mockées, faire un fetch
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
                if (response.ok) {
                    const result = await response.json();
                    setData(result.data);
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
