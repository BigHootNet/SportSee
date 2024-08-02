import { UserMainData, UserActivity, UserAverageSessions, UserPerformance } from '../types/user';

export const MOCK_USER_MAIN_DATA: UserMainData[] = [
    {
        id: 13,
        userInfos: {
            firstName: 'Jane',
            lastName: 'Doe',
            age: 28,
        },
        todayScore: 0.75,
        keyData: {
            calorieCount: 2100,
            proteinCount: 180,
            carbohydrateCount: 320,
            lipidCount: 70
        }
    },
];

export const MOCK_USER_ACTIVITY: UserActivity[] = [
    {
        userId: 13,
        sessions: [
            { day: '2020-08-01', kilogram: 70, calories: 250 },
            { day: '2020-08-02', kilogram: 70, calories: 230 },
            { day: '2020-08-03', kilogram: 71, calories: 270 },
            { day: '2020-08-04', kilogram: 71, calories: 280 },
            { day: '2020-08-05', kilogram: 70, calories: 200 },
            { day: '2020-08-06', kilogram: 68, calories: 210 },
            { day: '2020-08-07', kilogram: 66, calories: 400 }
        ]
    },
];

export const MOCK_USER_AVERAGE_SESSIONS: UserAverageSessions[] = [
    {
        userId: 13,
        sessions: [
            { day: 1, sessionLength: 0 },
            { day: 2, sessionLength: 50 },
            { day: 3, sessionLength: 60 },
            { day: 4, sessionLength: 70 },
            { day: 5, sessionLength: 25 },
            { day: 6, sessionLength: 30 },
            { day: 7, sessionLength: 75 }
        ]
    }
];

export const MOCK_USER_PERFORMANCE: UserPerformance[] = [
    {
        userId: 13,
        kind: {
            1: 'cardio',
            2: 'energy',
            3: 'endurance',
            4: 'strength',
            5: 'speed',
            6: 'intensity'
        },
        data: [
            { value: 85, kind: 1 },
            { value: 125, kind: 2 },
            { value: 145, kind: 3 },
            { value: 55, kind: 4 },
            { value: 210, kind: 5 },
            { value: 95, kind: 6 }
        ]
    },
];
