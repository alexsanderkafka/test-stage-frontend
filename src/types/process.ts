import type Area from "./area";
import type { Documentation } from "./Documentations";
import type { People } from "./people";
import type { Subprocess } from "./subprocess";
import type { Tool } from "./tool";

export type ProcessType = 'manual' | 'systemic';

export default interface Process {
  externalId: string;
  name: string;
  type: ProcessType;
  description: string;
  area: Area;
  subprocess: Subprocess[];
  tools: Tool[];
  peoples: People[];
  documentations: Documentation[];
}