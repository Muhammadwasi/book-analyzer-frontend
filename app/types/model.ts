export interface Interaction {
  name: string;
  count: number;
}

export interface CharacterInteraction {
  character_name: string;
  interacted_with: Interaction[];
  total_interactions: number;
}

export interface CharacterInteractions {
  character_interactions: CharacterInteraction[];
}

export interface TaskStatusResponse {
  task_id: string;
  status: TaskStatus
  progress: number
  error: string
  result: CharacterInteractions
}

export interface AnalyzeResponse {
  task_id: string;
}

export type TaskStatus = "done" | "in_progress" | "error"