export interface Milestone {
  year: number;
  title: string;
  description: string;
  features: string[];
  icon: 'zap' | 'brain' | 'globe'; // Icon identifier
}

export interface RoadmapData {
  year1: Milestone;
  year3: Milestone;
  year5: Milestone;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}