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
    <div className="h-full flex flex-col">
      <div className="relative px-3 py-6 flex items-center">
        <button className="absolute rounded-md p-1 hover:bg-gray-200" onClick={onBack}>
          <ChevronLeft size={28} absoluteStrokeWidth />
        </button>
        <div className="mx-auto flex items-center text-message gap-2">
          <MessageSquareText size={20} />
          <h1 className="text-xl font-bold">{selectedNode.type}</h1>
        </div>
      </div>
      <div className="flex flex-col flex-grow gap-2 p-3">
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
          className="outline outline-gray-300 focus:outline-2 focus:outline-gray-500 rounded-md py-1 px-3"
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
          className="outline outline-gray-300 focus:outline-2 focus:outline-gray-500 rounded-md py-2 px-3"
        ></textarea>
      </div>
      <div className="px-3 py-6">
        <button
          className="text-white bg-red-500 p-2 flex gap-2 items-center rounded-md w-full justify-center hover:bg-red-700 transition-colors duration-200"
          onClick={onDelete}
        >
          <Trash2 size={20} />
          Delete
        </button>
      </div>
    </div>
  );
};
