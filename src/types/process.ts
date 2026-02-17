import type { Subprocess } from "./subprocess";

export type ProcessType = 'manual' | 'systemic';

export interface Process {
  id: string;
  areaId: string;
  subprocesses?: Subprocess[];
  name: string;
  type: ProcessType;
  description?: string;
  tools?: string[];
  owners?: string[];
  documentation?: string[];
  position?: { x: number; y: number }; 
}