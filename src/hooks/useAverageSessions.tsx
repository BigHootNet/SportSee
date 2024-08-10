import { useState, useEffect } from 'react';
import { UserAverageSessions } from '../types/user';
import mockData from '../__mocks__/mockedData.json';
import { formatUserAverageSessions } from '../utils/formatData';

export const useAverageSessions = (userId: number) => {
  const [data, setData] = useState<UserAverageSessions | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let sessionData: UserAverageSessions | undefined;

        // Filtrer les données mockées pour récupérer les sessions moyennes
        const mockDataArray = (mockData as { userId: number; averageSessions: { day: string; sessionLength: number }[] }[]).filter(
          (item) => item.userId === userId && Array.isArray(item.averageSessions)
        );

        if (mockDataArray.length > 0) {
          const formattedData = formatUserAverageSessions(mockDataArray);
          sessionData = formattedData.find(item => item.userId === userId);
        }

        // Si les données ne sont pas trouvées dans les mocks, faire un appel API
        if (!sessionData) {
          const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);

          if (response.ok) {
            const result = await response.json();

            if (Array.isArray(result.data.sessions)) {
              const formattedData = formatUserAverageSessions([{
                userId,
                averageSessions: result.data.sessions.map((session: { day: number; sessionLength: number }) => ({
                  day: session.day.toString(),
                  sessionLength: session.sessionLength
                }))
              }]);

              sessionData = formattedData[0];
            } else {
              console.error("API response format is incorrect: 'sessions' is not an array", result);
              setError("API response format is incorrect: 'sessions' is not an array");
              return;
            }
          } else {
            setError(`Error fetching average sessions: ${response.statusText}`);
            return;
          }
        }

        if (sessionData) {
          setData(sessionData);
        }
      } catch (error) {
        setError("Error fetching average sessions: " + (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { data, isLoading, error };
};
