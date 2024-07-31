import { useState, useEffect } from 'react';

interface SessionData {
  day: number;
  sessionLength: number;
}

export const useAverageSessions = (userId: string) => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setSessions(result.data.sessions);
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
