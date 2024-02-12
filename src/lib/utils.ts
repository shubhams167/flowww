import { Edge, MarkerType, Node, XYPosition } from "reactflow";
import { CustomNodeType } from "../components/nodes";
import { ReactFlowState } from "./types";
import _ from "lodash";

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

export const getNodeObject = (
  nodes: Node<any, string | undefined>[],
  type: CustomNodeType,
  position: XYPosition
) => {
  // last node with type = nodeType
  const lastSimilarNode = _.findLast(nodes, (node) => node.type === type);
  const lastSimilarNodeId = lastSimilarNode ? lastSimilarNode.id : `${type}-0`;
  const nextNodeNumericId = String(+lastSimilarNodeId.split("-")[1] + 1);

  return {
    id: `${type}-${nextNodeNumericId}`,
    type,
    position,
    data: { type: type, label: `${type} ${nextNodeNumericId}` },
  };
};
