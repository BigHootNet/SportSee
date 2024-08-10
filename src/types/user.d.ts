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
  todayScore?: number;
  score?: number;
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

// Définition du type RawUserData correspondant aux données brutes du JSON
export interface RawUserData {
  id: number;
  userInfos: {
      firstName: string;
      lastName: string;
      age: number;
  };
  todayScore: number;
  keyData: {
      calorieCount: number;
      proteinCount: number;
      carbohydrateCount: number;
      lipidCount: number;
  };
}

export interface MockDataType {
  userId?: number;
  averageSessions?: AverageSession[];
  sessions?: { day: string; kilogram: number; calories: number }[]; // Précisez la structure des sessions
  kind?: Record<number, string>;
  data?: { value: number; kind: number }[]; // Précisez la structure des données
}
