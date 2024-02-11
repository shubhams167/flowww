import { ReactFlowJsonObject } from "reactflow";

export type ReactFlowState =
  | (Partial<ReactFlowJsonObject> & {
      name?: string;
      uuid?: string;
      published?: boolean;
    })
  | null;
