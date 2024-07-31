// user.d.ts

export interface KeyData {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
}

export interface UserInfo {
    firstName: string;
    lastName: string;
    age: number;
}

export interface UserData {
    id: number;
    userInfos: UserInfo;
    score?: number; // optional field in case score is used instead of todayScore
    todayScore?: number; // optional field in case todayScore is used instead of score
    keyData: KeyData;
}

export interface UserActivityChartProps {
    userId: string;
}

export interface SessionData {
    day: string;
    kilogram: number;
    calories: number;
}

export type UserParams = Record<string, string | undefined>;
