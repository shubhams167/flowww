import { ChevronLeft, MessageSquareText, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import { useReactFlow } from "reactflow";
import { CustomNodeData } from "../../nodes";

type Props = {
  onBack: () => void;
  onDelete: () => void;
  onNodeDataChange: (data: HandleNodeChangeData) => void;
};

type HandleNodeChangeData = Partial<CustomNodeData & { selected: boolean }>;

export const MessageSettings = ({ onBack, onDelete, onNodeDataChange }: Props) => {
  const reactFlow = useReactFlow();
  const nodes = reactFlow.getNodes();
  const selectedNode = nodes.find((node) => node.selected);

  if (!selectedNode) return null;

  const onLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    onNodeDataChange({ label });
  };

  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    onNodeDataChange({ type: "Message", text });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex items-center px-3 py-6">
        <button className="absolute rounded-md p-1 hover:bg-gray-200" onClick={onBack}>
          <ChevronLeft size={28} absoluteStrokeWidth />
        </button>
        <div className="mx-auto flex items-center gap-2 text-message">
          <MessageSquareText size={20} />
          <h1 className="text-xl font-bold">{selectedNode.type}</h1>
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-2 p-3">
        <label htmlFor="label" className="text-gray-600">
          Label
        </label>
        <input
          key={`label-${selectedNode.id}`}
          id="label"
          onChange={onLabelChange}
          size={10}
          defaultValue={selectedNode.data.label}
          placeholder="Enter message label"
          className="rounded-md px-3 py-1 outline outline-gray-300 focus:outline-2 focus:outline-gray-500"
        />
        <label htmlFor="message" className="text-gray-600">
          Text
        </label>
        <textarea
          key={`message-${selectedNode.id}`}
          id="message"
          rows={4}
          onChange={onTextChange}
          defaultValue={selectedNode.data.text}
          placeholder="Enter message text"
          className="rounded-md px-3 py-2 outline outline-gray-300 focus:outline-2 focus:outline-gray-500"
        ></textarea>
      </div>
      <div className="px-3 py-6">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md bg-red-600 p-2 text-white transition-colors duration-200 hover:bg-red-700"
          onClick={onDelete}
        >
          <Trash2 size={20} />
          Delete
        </button>
      </div>
    </div>
  );
};
