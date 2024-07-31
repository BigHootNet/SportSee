import { useState, useEffect } from 'react';

interface SessionData {
    day: string;
    kilogram: number;
    calories: number;
}

export const useUserActivity = (userId: string) => {
    const [sessions, setSessions] = useState<SessionData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError('');  // Réinitialiser l'erreur avant de commencer la récupération
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const { data } = await response.json();
                setSessions(data.sessions);
                setError(''); // Réinitialiser l'erreur après récupération réussie
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return { sessions, isLoading, error };
};
