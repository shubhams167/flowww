import { Trash2, UploadCloud } from "lucide-react";
import { DragEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { NodesDrawer, SettingsDrawer } from "../components/drawers";
import { CustomNodeData, CustomNodeType, nodeTypes } from "../components/nodes";
import useLocalStorage from "../hooks/useLocaleStorage";
import { ReactFlowState } from "../lib/types";
import { addEndMarker, getNodeObject, isValidLinearFlow } from "../lib/utils";

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

  const onPublish = () => {
    if (isValidLinearFlow(nodes, edges)) {
      return toast.success("Published");
    }
    toast.error("Invalid flow");
  };

  const onDelete = () => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(uuid);
    toast.success("Deleted");
    navigate("/view");
  };

  const selectedNode = nodes.find((node) => node.selected);

  return (
    <div className="relative flex h-screen w-full">
      <div className="absolute left-10 top-6 z-10 flex gap-4">
        <input
          id="flow-name"
          onChange={(event) => setFlowState((prev) => ({ ...prev, uuid, name: event.target.value }))}
          size={20}
          defaultValue={flowState?.name}
          placeholder="Flow name"
          autoComplete="off"
          className="rounded-md bg-white px-3 py-2 text-lg shadow-md outline outline-slate-300 focus:outline-2 focus:outline-slate-500"
        />
        <button
          onClick={onPublish}
          title="Publish"
          className="rounded-md bg-white p-2 text-blue-600 shadow-md outline outline-slate-300 hover:bg-gray-200 focus:outline-2 focus:outline-slate-500"
        >
          <UploadCloud size={24} />
        </button>
        <button
          onClick={onDelete}
          title="Delete"
          className="rounded-md bg-white p-2 text-red-600 shadow-md outline outline-slate-300 hover:bg-gray-200 focus:outline-2 focus:outline-slate-500"
        >
          <Trash2 size={24} />
        </button>
      </div>
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
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      {selectedNode ? <SettingsDrawer show={true} /> : <NodesDrawer show={true} />}
    </div>
  );
};
