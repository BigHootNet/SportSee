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

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                const apiData: UserMainData = result.data;
                console.log("API user data:", apiData);
                setData(apiData);
            } catch (apiError) {
                console.error("Error fetching user data from API:", apiError);
                const mockData = MOCK_USER_MAIN_DATA.find(user => user.id === userId);
                console.log("Mock user data:", mockData);
                if (mockData) {
                    setData(mockData);
                } else {
                    setError("User data not found");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
