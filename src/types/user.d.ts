export interface UserParams {
    [key: string]: string | undefined;
    userId?: string;
  }
  
  export interface KeyData {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  }
  
  export interface UserInfos {
    firstName: string;
    lastName: string;
    age: number;
  }
  
  export interface UserMainData {
    id: number;
    userInfos: UserInfos;
    todayScore?: number; // note the use of optional field
    score?: number; // another optional field
    keyData: KeyData;
  }
  
  export interface ActivitySession {
    day: string;
    kilogram: number;
    calories: number;
  }
  
  export interface UserActivity {
    userId: number;
    sessions: ActivitySession[];
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
  