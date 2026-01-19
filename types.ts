export interface Student {
  id: string;
  name: string;
  points: number;
}

export interface PointLog {
  id: string;
  studentId: string;
  studentName: string;
  change: number;
  reason: string;
  timestamp: number;
}

export enum AppTab {
  RECORD = 'RECORD',
  PODIUM = 'PODIUM',
}
