import { MessageSquareText, Pencil } from "lucide-react";
import { Handle, NodeProps, Position } from "reactflow";

export type MessageData = {
  type: "Message";
  label: string;
  text?: string;
};

export function Message({ id, data, selected }: NodeProps<MessageData>) {
  return (
    <button
      className={`min-w-40 max-w-80 rounded-md bg-white shadow-lg transition-shadow duration-300 ${
        selected && "shadow-message-light"
      }`}
    >
      <div className="flex items-center gap-1 rounded-t-md bg-message p-2 text-white">
        <MessageSquareText size={16} className="scale-75" />
        <h1 className="text-xs font-bold">{data.label}</h1>
      </div>
      <div className="rounded-b-md px-2 py-3">
        {data.text ? (
          <p className="text-left text-xs text-gray-700">{data.text}</p>
        ) : (
          <Pencil size={16} className="mx-auto scale-75 text-gray-300" />
        )}
      </div>
      <Handle type="target" position={Position.Left} id={`${id}-target`} />
      <Handle type="source" position={Position.Right} id={`${id}-source`} />
    </button>
  );
}
