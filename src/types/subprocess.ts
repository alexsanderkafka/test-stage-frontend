import type { ProcessType } from "./process";

export interface Subprocess {
    id: string;
    name: string;
    description?: string;
    type: ProcessType;
}