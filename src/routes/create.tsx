import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Connection,
} from "reactflow";
import { MessageData, nodeTypes } from "../components/nodes";
import { NodesPanel, SettingsPanel } from "../components/panels";
import { addEndMarker } from "../utils";
import { useCallback } from "react";

export const Create = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState<MessageData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<never>([]);

  const onConnect = useCallback(
    (params: Connection) => {
      // do not connect same node
      if (params.source === params.target) return;
      // do not allow more than one edge from same source
      if (edges.some((edge) => edge.source === params.source)) return;

      setEdges((eds) => addEdge(params, eds).map(addEndMarker));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setEdges]
  );

  const selectedNode = nodes.find((node) => node.selected);

  return (
    <>
      <div className="w-4/5 h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls fitViewOptions={{ duration: 300 }} />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      <SettingsPanel show={!!selectedNode} />
      <NodesPanel show={!selectedNode} />
    </>
  );
};
