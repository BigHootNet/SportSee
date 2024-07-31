import { useState, useEffect } from 'react';
import { UserData } from '../types/user';

interface APIResponse {
    data: UserData | null;
    error: string;
    isLoading: boolean;
}

export const useUserData = (userId: string): APIResponse  => {
    const [data, setData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        const controller = new AbortController();

        const fetchData = async () => {
            setIsLoading(true);
            setError('');  // Réinitialiser l'erreur avant de commencer la récupération
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonResponse: APIResponse = await response.json();
                setData(jsonResponse.data);
                setError(''); // Réinitialiser l'erreur après récupération réussie
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [userId]);

    return { data, isLoading, error };
};
