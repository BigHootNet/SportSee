import { useState, useEffect } from 'react';
import { UserMainData } from '../types/user';
import { MOCK_USER_MAIN_DATA } from '../__mocks__/mockedData';
import { formatUserMainData } from '../utils/formatData';

export const useUserData = (userId: number) => {
    const [data, setData] = useState<UserMainData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Vérifier les données mockées d'abord
                const mockData = MOCK_USER_MAIN_DATA.find(user => user.id === userId);
                if (mockData) {
                    const formattedData = formatUserMainData([mockData]);
                    setData(formattedData[0]);
                    setIsLoading(false);
                    return;
                }

                // Si pas de données mockées, faire un fetch
                const response = await fetch(`http://localhost:3000/user/${userId}`);
                if (response.ok) {
                    const result = await response.json();
                    const formattedData = formatUserMainData([result.data]);
                    setData(formattedData[0]);
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
