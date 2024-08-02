import { UserInfo, KeyData, SessionData } from './user';

export interface UserMainData {
    id: number;
    userInfos: UserInfo;
    todayScore: number;
    keyData: KeyData;
}

export interface UserActivity {
    userId: number;
    sessions: SessionData[];
}

export interface AverageSession {
    day: number;
    sessionLength: number;
}

export interface UserAverageSessions {
    userId: number;
    sessions: AverageSession[];
}

export interface PerformanceData {
    value: number;
    kind: number;
}

export interface UserPerformance {
    userId: number;
    kind: Record<number, string>;
    data: PerformanceData[];
}
