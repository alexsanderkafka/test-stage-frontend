import type Process from "./process";

export default interface Area {
  externalId: string;
  name: string;
  description: string;
  processes: Process[];
}