import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Connection,
  ReactFlowInstance,
  useReactFlow,
} from "reactflow";
import { CustomNodeType, CustomNodeData, nodeTypes } from "../components/nodes";
import { NodesPanel, SettingsPanel } from "../components/drawers";
import { addEndMarker, getNodeObject } from "../lib/utils";
import { DragEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocaleStorage";
import { ReactFlowState } from "../lib/types";

export const Create = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<never>([]);
  const { flowId } = useParams();
  const uuid = useMemo(() => flowId ?? crypto.randomUUID(), [flowId]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [flowState, setFlowState] = useLocalStorage<ReactFlowState>(uuid, null);
  const { setViewport } = useReactFlow();
  const navigate = useNavigate();

  useEffect(() => {
    if (!flowId) navigate(`/create/${uuid}`);
  });

  useEffect(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      setFlowState((prev) => ({ ...prev, ...flow, uuid }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);

  useEffect(() => {
    if (flowState) {
      setNodes(flowState.nodes || []);
      setEdges(flowState.edges || []);
      if (flowState.viewport) {
        const { x = 0, y = 0, zoom = 1 } = flowState.viewport;
        setViewport({ x, y, zoom });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      // do not connect same node
      if (params.source === params.target) return;
      // do not allow more than one edge from same source
      if (edges.some((edge) => edge.source === params.source)) return;

      setEdges((eds) => addEdge(params, eds).map(addEndMarker));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [edges, setEdges]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow") as CustomNodeType;

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!rfInstance) return;

      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = getNodeObject(nodes, type, position);

      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance, nodes, setNodes]
  );

  const selectedNode = nodes.find((node) => node.selected);

  return (
    <div className="relative flex w-full">
      <div className="relative w-4/5 h-screen">
        <input
          id="flow-name"
          onChange={(event) =>
            setFlowState((prev) => ({ ...prev, uuid, name: event.target.value }))
          }
          size={20}
          defaultValue={flowState?.name}
          placeholder="Flow name"
          className="absolute top-6 left-1/2 -translate-x-1/2 text-lg bg-white z-10 shadow-md outline outline-slate-300 focus:outline-2 focus:outline-slate-500 rounded-md py-2 px-3"
        />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setRfInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Controls fitViewOptions={{ duration: 300 }} />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      {selectedNode ? <SettingsPanel show={true} /> : <NodesPanel show={true} />}
    </div>
  );
};
