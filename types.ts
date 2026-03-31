export interface Deal {
  id: string;
  name: string;
  value: number;
  score: 'High' | 'Med' | 'Low';
  stage: 'Prospect' | 'Engaged' | 'Committed' | 'No-Go';
  owner: string;
  avatar: string;
  date: string;
  status?: string;
}

export interface Automation {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Draft';
  enrolled: number;
  completed: number;
  trigger: string;
}

export type ViewState = 
  | 'dashboard' 
  | 'pipeline_board' 
  | 'pipeline_matrix' 
  | 'automations' 
  | 'automation_builder' 
  | 'import' 
  | 'focus_mode';