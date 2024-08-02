import { useState, useEffect } from 'react';
import { UserActivity } from '../types/user';
import { MOCK_USER_ACTIVITY } from '../__mocks__/mockedData';

export const useUserActivity = (userId: number) => {
    const [data, setData] = useState<UserActivity | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                const apiData: UserActivity = result.data;
                console.log("API user activity:", apiData);
                setData(apiData);
            } catch (apiError) {
                console.error("Error fetching user activity from API:", apiError);
                const mockData = MOCK_USER_ACTIVITY.find(activity => activity.userId === userId);
                console.log("Mock user activity:", mockData);
                if (mockData) {
                    setData(mockData);
                } else {
                    setError("User activity not found");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
