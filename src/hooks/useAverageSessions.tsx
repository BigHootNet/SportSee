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

            let apiData: UserAverageSessions | null = null;
            let mockData: UserAverageSessions | undefined = undefined;

            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
                if (response.ok) {
                    const result = await response.json();
                    apiData = result.data;
                }
            } finally {
                if (!apiData) {
                    mockData = MOCK_USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
                    console.log("Mock average sessions:", mockData);
                    if (mockData) {
                        setData(mockData);
                    } else {
                        setError("Average sessions not found");
                    }
                } else {
                    console.log("API average sessions:", apiData);
                    setData(apiData);
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { data, isLoading, error };
};
