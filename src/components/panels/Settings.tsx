import { Transition } from "@headlessui/react";
import { ChevronLeft, MessageSquareText } from "lucide-react";
import React, { ChangeEvent } from "react";
import { useReactFlow } from "reactflow";

type Props = {
  show: boolean;
};

/** Component to show settings for a selected node */
export const SettingsPanel = ({ show }: Props) => {
  const reactFlow = useReactFlow();
  const nodes = reactFlow.getNodes();
  const selectedNode = nodes.find((node) => node.selected);

  if (!selectedNode) return null;

  const handleMessageDataChange = ({
    label,
    text,
    selected,
  }: {
    label?: string;
    text?: string;
    selected?: boolean;
  }) => {
    reactFlow.setNodes((oldNodes) => {
      const updatedNodes = oldNodes.map((node) => {
        if (node.id !== selectedNode.id) return node;

        return {
          ...node,
          selected: !!selected,
          data: {
            ...node.data,
            label: label ?? node.data.label,
            text: text ?? node.data.text,
          },
        };
      });

      return updatedNodes;
    });
  };

  const onBack = () => {
    handleMessageDataChange({ selected: false });
  };

  const onLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    handleMessageDataChange({ label });
  };

  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    handleMessageDataChange({ text });
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
        <div className="relative px-3 py-4 shadow-md flex items-center">
          <button className="absolute rounded-md p-1 hover:bg-gray-200" onClick={onBack}>
            <ChevronLeft size={28} absoluteStrokeWidth />
          </button>
          <div className="mx-auto flex items-center text-message gap-2">
            <MessageSquareText size={20} />
            <h1 className="text-xl font-bold">{selectedNode.type}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3">
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
      </div>
    </Transition>
  );
};
