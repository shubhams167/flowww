import { Edge, MarkerType } from "reactflow";
import { ReactFlowState } from "./types";

export const addEndMarker = (edge: Edge) => ({
  ...edge,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: "#b1b1b7",
  },
});

export const getFlowsFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const rawFlows = { ...window.localStorage };
  const flows: ReactFlowState[] = [];

  for (const uuid in rawFlows) {
    try {
      const flow = JSON.parse(rawFlows[uuid]) as ReactFlowState;
      flows.push(flow);
    } catch (err) {}
  }
  return flows;
};
