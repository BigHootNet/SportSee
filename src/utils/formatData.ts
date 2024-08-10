import { UserMainData, UserActivity, UserAverageSessions, UserPerformance } from '../types/user';

// Formatage des données principales de l'utilisateur
export const formatUserMainData = (data: UserMainData[]): UserMainData[] => {
    return data.map((item) => ({
        id: item.id,
        userInfos: {
            firstName: item.userInfos.firstName,
            lastName: item.userInfos.lastName,
            age: item.userInfos.age,
        },
        todayScore: item.todayScore ?? item.score ?? 0,
        keyData: {
            calorieCount: item.keyData.calorieCount,
            proteinCount: item.keyData.proteinCount,
            carbohydrateCount: item.keyData.carbohydrateCount,
            lipidCount: item.keyData.lipidCount
        }
    }));
};

// Formatage des données d'activité utilisateur
export const formatUserActivity = (data: UserActivity[]): UserActivity[] => {
    return data.map((item) => ({
        userId: item.userId,
        sessions: item.sessions.map((session) => ({
            day: session.day,  // Directement utiliser si 'day' est déjà un nombre
            kilogram: session.kilogram,
            calories: session.calories,
        }))
    }));
};

export const formatUserAverageSessions = (data: { userId: number; sessions?: { day: number; sessionLength: number }[]; averageSessions?: { day: string; sessionLength: number }[] }[]): UserAverageSessions[] => {

    return data.map(item => {
        const sessions = item.averageSessions
            ? item.averageSessions.map(session => ({
                day: parseInt(session.day, 10),
                sessionLength: session.sessionLength
            }))
            : item.sessions?.map(session => ({
                day: session.day,
                sessionLength: session.sessionLength
            })) || [];

        return {
            userId: item.userId,
            sessions
        };
    });
};

// Formatage des données des sessions moyennes avec labels
const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export const formatUserAverageSessionsData = (data: UserAverageSessions) => {
    const sessionsWithLabels = data.sessions.map(session => ({
        ...session,
        dayLabel: days[session.day - 1],  // Convertir le jour numérique en jour de la semaine
    }));

    const maxSessionLength = Math.max(...sessionsWithLabels.map(session => session.sessionLength));
    const minSessionLength = Math.min(...sessionsWithLabels.map(session => session.sessionLength));

    return {
        sessionsWithLabels,
        maxSessionLength,
        minSessionLength,
    };
};

// Formatage des performances utilisateur
export const formatUserPerformance = (data: UserPerformance[]): UserPerformance[] => {
    return data.map((item) => ({
        userId: item.userId,
        kind: item.kind,
        data: item.data.map((dataPoint) => ({
            value: dataPoint.value,
            kind: dataPoint.kind
        }))
    }));
};

export const formatUserPerformanceData = (data: UserPerformance) => {
    return data.data.map(item => ({
        ...item,
        kind: data.kind[item.kind], // Remplace l'index par le label approprié
    }));
};
