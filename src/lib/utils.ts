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

export const isValidUUID = (str: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
};

export const getFlowsFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const rawFlows = { ...window.localStorage };
  const flows: ReactFlowState[] = [];

  for (const key in rawFlows) {
    try {
      if (!isValidUUID(key)) continue;
      const uuid = key;
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

// n nodes with n-1 edges
export const isValidLinearFlow = (nodes: Node<any, string | undefined>[], edges: Edge[]) => {
  let numNodesWithIncomingEdge = 0;
  nodes.forEach((node) => {
    if (edges.some((edge) => edge.target === node.id)) numNodesWithIncomingEdge++;
  });
  return numNodesWithIncomingEdge === nodes.length - 1;
};
