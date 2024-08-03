import { useState, useEffect } from 'react';
import { UserMainData } from '../types/user';
import { MOCK_USER_MAIN_DATA } from '../__mocks__/mockedData';

export const useUserData = (userId: number) => {
    const [data, setData] = useState<UserMainData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            // Vérifier les données mockées d'abord
            const mockData = MOCK_USER_MAIN_DATA.find(user => user.id === userId);
            if (mockData) {
                setData(mockData);
                setIsLoading(false);
                return;
            }

            // Si pas de données mockées, faire un fetch
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`);
                if (response.ok) {
                    const result = await response.json();
                    setData(result.data);
                } else {
                    setError("User data not found");
                }
            } catch (error) {
                setError("Error fetching user data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
