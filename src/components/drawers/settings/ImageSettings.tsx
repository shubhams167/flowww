import { ChevronLeft, ImageIcon, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import { useReactFlow } from "reactflow";
import { CustomNodeData } from "../../nodes";

type Props = {
  onBack: () => void;
  onDelete: () => void;
  onNodeDataChange: (data: HandleNodeChangeData) => void;
};

type HandleNodeChangeData = Partial<CustomNodeData & { selected: boolean }>;

export const ImageSettings = ({ onBack, onDelete, onNodeDataChange }: Props) => {
  const reactFlow = useReactFlow();
  const nodes = reactFlow.getNodes();
  const selectedNode = nodes.find((node) => node.selected);

  if (!selectedNode) return null;

  const onLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    onNodeDataChange({ label });
  };

  const onSourceChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const src = event.target.value;
    onNodeDataChange({ type: "Image", src });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex items-center px-3 py-6">
        <button className="absolute rounded-md p-1 hover:bg-gray-200" onClick={onBack}>
          <ChevronLeft size={28} absoluteStrokeWidth />
        </button>
        <div className="mx-auto flex items-center gap-2 text-image">
          <ImageIcon size={20} />
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
          placeholder="Enter image label"
          className="rounded-md px-3 py-1 outline outline-gray-300 focus:outline-2 focus:outline-gray-500"
        />
        <label htmlFor="image" className="text-gray-600">
          Source URL
        </label>
        <textarea
          key={`source-${selectedNode.id}`}
          id="source"
          rows={4}
          onChange={onSourceChange}
          defaultValue={selectedNode.data.src}
          placeholder="Enter image url"
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
