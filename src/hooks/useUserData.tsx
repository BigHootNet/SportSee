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

            let apiData: UserMainData | null = null;
            let mockData: UserMainData | undefined = undefined;

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`);
                if (response.ok) {
                    const result = await response.json();
                    apiData = result.data;
                }
            } finally {
                if (!apiData) {
                    mockData = MOCK_USER_MAIN_DATA.find(user => user.id === userId);
                    console.log("Mock user data:", mockData);
                    if (mockData) {
                        setData(mockData);
                    } else {
                        setError("User data not found");
                    }
                } else {
                    console.log("API user data:", apiData);
                    setData(apiData);
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
