import { Transition } from "@headlessui/react";
import React from "react";
import { useReactFlow } from "reactflow";
import { CustomNodeData } from "../../nodes";
import { MessageSettings } from "./MessageSettings";
import { ImageSettings } from "./ImageSettings";
import { AudioSettings } from "./AudioSettings";

type Props = {
  show: boolean;
};

type HandleNodeChangeData = Partial<CustomNodeData & { selected: boolean }>;

/** Component to show settings for a selected node */
export const SettingsPanel = ({ show }: Props) => {
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
      <div className="w-1/5 h-screen bg-white shadow-xl">
        {selectedNodeData.type === "Message" && (
          <MessageSettings onBack={onBack} onNodeDataChange={handleNodeDataChange} />
        )}
        {selectedNodeData.type === "Image" && (
          <ImageSettings onBack={onBack} onNodeDataChange={handleNodeDataChange} />
        )}
        {selectedNodeData.type === "Audio" && (
          <AudioSettings onBack={onBack} onNodeDataChange={handleNodeDataChange} />
        )}
      </div>
    </Transition>
  );
};
