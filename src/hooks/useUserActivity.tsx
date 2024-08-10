import { useState, useEffect } from 'react';
import { UserActivity } from '../types/user';
import mockData from '../__mocks__/mockedData.json';
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
                let activityData: UserActivity | undefined;

                // Vérifier les données mockées d'abord
                const mockDataArray = mockData as Array<UserActivity | { userId: number }>;
                activityData = mockDataArray.find(item => 'userId' in item && item.userId === userId) as UserActivity;

                if (!activityData) {
                    // Si pas de données mockées, faire un fetch
                    const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
                    if (response.ok) {
                        const result = await response.json();
                        activityData = result.data;
                    } else {
                        setError("Activity data not found");
                        return;
                    }
                }

                // Formater et afficher les données
                if (activityData) {
                    const formattedData = formatUserActivity([activityData]);
                    setData(formattedData[0]);
                }
            } catch (error) {
                setError("Error fetching activity data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};


export default useUserActivity;
