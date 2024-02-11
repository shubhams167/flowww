import { MessageSquareText, Pencil } from "lucide-react";
import { Handle, NodeProps, Position } from "reactflow";

export type MessageData = {
  label: string;
  text?: string;
};

export function Message({ data, selected }: NodeProps<MessageData>) {
  return (
    <button
      className={`bg-white min-w-40 max-w-80 rounded-md transition-shadow duration-300 shadow-lg ${
        selected && "shadow-message-light"
      }`}
    >
      <div className="bg-message text-white p-2 flex items-center gap-1 rounded-t-md">
        <MessageSquareText size={16} className="scale-75" />
        <h1 className="text-xs font-bold">{data.label}</h1>
      </div>
      <div className="rounded-b-md px-2 py-3">
        {data.text ? (
          <p className="text-xs text-gray-700 text-left">{data.text}</p>
        ) : (
          <Pencil size={16} className="text-gray-300 mx-auto scale-75" />
        )}
      </div>
      <Handle type="target" position={Position.Left} id="target" />
      <Handle type="source" position={Position.Right} id="source" />
    </button>
  );
}
