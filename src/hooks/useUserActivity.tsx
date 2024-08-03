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

            let apiData: UserActivity | null = null;
            let mockData: UserActivity | undefined = undefined;

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
                if (response.ok) {
                    const result = await response.json();
                    apiData = result.data;
                }
            } finally {
                if (!apiData) {
                    mockData = MOCK_USER_ACTIVITY.find(activity => activity.userId === userId);
                    console.log("Mock user activity:", mockData);
                    if (mockData) {
                        setData(mockData);
                    } else {
                        setError("User activity not found");
                    }
                } else {
                    console.log("API user activity:", apiData);
                    setData(apiData);
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
