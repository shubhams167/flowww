import { ImageIcon, ImagePlus } from "lucide-react";
import { Handle, NodeProps, Position } from "reactflow";

export type ImageData = {
  type: "Image";
  label: string;
  src?: string;
};

export function Image({ id, data, selected }: NodeProps<ImageData>) {
  return (
    <button
      className={`bg-white min-w-40 max-w-80 rounded-md transition-shadow duration-300 shadow-lg ${
        selected && "shadow-image-light"
      }`}
    >
      <div className="bg-image text-white p-2 flex items-center gap-1 rounded-t-md">
        <ImageIcon size={16} className="scale-75" />
        <h1 className="text-xs font-bold">{data.label}</h1>
      </div>
      <div className="rounded-b-md px-2 py-3">
        {data.src ? (
          <p className="text-xs text-gray-700 text-left">{data.src}</p>
        ) : (
          <ImagePlus size={16} className="text-gray-300 mx-auto scale-75" />
        )}
      </div>
      <Handle type="target" position={Position.Left} id={`${id}-target`} />
      <Handle type="source" position={Position.Right} id={`${id}-source`} />
    </button>
  );
}
