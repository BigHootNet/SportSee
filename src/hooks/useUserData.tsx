import { useState, useEffect } from 'react';
import { UserMainData } from '../types/user';
import mockData from '../__mocks__/mockedData.json'; // Assurez-vous que ceci correspond bien à votre fichier JSON
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
                let userData: UserMainData | undefined;

                // Vérifier les données mockées d'abord
                const mockDataArray = mockData as Array<UserMainData | { userId: number }>;
                userData = mockDataArray.find(item => 'id' in item && item.id === userId) as UserMainData;

                if (!userData) {
                    // Si pas de données mockées, faire un fetch
                    const response = await fetch(`http://localhost:3000/user/${userId}`);
                    if (response.ok) {
                        const result = await response.json();
                        userData = result.data;
                    } else {
                        setError("User data not found");
                        return;
                    }
                }

                // Formater et afficher les données
                if (userData) {
                    const formattedData = formatUserMainData([userData]);
                    setData(formattedData[0]);
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
