import { Transition } from "@headlessui/react";
import React from "react";
import { useReactFlow } from "reactflow";
import { CustomNodeData } from "../../nodes";
import { AudioSettings } from "./AudioSettings";
import { ImageSettings } from "./ImageSettings";
import { MessageSettings } from "./MessageSettings";

type Props = {
  show: boolean;
};

type HandleNodeChangeData = Partial<CustomNodeData & { selected: boolean }>;

export const SettingsDrawer = ({ show }: Props) => {
  const reactFlow = useReactFlow();
  const nodes = reactFlow.getNodes();
  const selectedNode = nodes.find((node) => node.selected);

  if (!selectedNode) return null;

  const selectedNodeData = selectedNode.data as CustomNodeData;

  const handleNodeDataChange = (data: HandleNodeChangeData) => {
    reactFlow.setNodes((oldNodes) => {
      const updatedNodes = oldNodes.map((node) => {
        if (node.id !== selectedNode.id) return node;

        return {
          ...node,
          selected: data.selected ?? node.selected,
          data: {
            ...node.data,
            label: data.label ?? node.data.label,
            ...(data.type === "Message" ? { text: data.text ?? node.data.text } : {}),
            ...(data.type === "Audio" ? { src: data.src ?? node.data.text } : {}),
            ...(data.type === "Image" ? { src: data.src ?? node.data.text } : {}),
          },
        };
      });

      return updatedNodes;
    });
  };

  const onBack = () => {
    handleNodeDataChange({ selected: false });
  };

  const onDelete = () => {
    reactFlow.setEdges((edges) =>
      edges.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id)
    );
    reactFlow.setNodes((nodes) => nodes.filter((node) => node.id !== selectedNode.id));
  };

  return (
    <Transition
      as={React.Fragment}
      appear={true}
      show={show}
      enter="transition-transform duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div className="absolute right-0 h-screen w-2/12 bg-white shadow-xl">
        {selectedNodeData.type === "Message" && (
          <MessageSettings onBack={onBack} onDelete={onDelete} onNodeDataChange={handleNodeDataChange} />
        )}
        {selectedNodeData.type === "Image" && (
          <ImageSettings onBack={onBack} onDelete={onDelete} onNodeDataChange={handleNodeDataChange} />
        )}
        {selectedNodeData.type === "Audio" && (
          <AudioSettings onBack={onBack} onDelete={onDelete} onNodeDataChange={handleNodeDataChange} />
        )}
      </div>
    </Transition>
  );
};
