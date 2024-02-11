import { Transition } from "@headlessui/react";
import { MessageSquareText, Plus, Shapes } from "lucide-react";
import React, { useEffect } from "react";
import { useReactFlow } from "reactflow";

type Props = {
  show: boolean;
};

export const NodesPanel = ({ show }: Props) => {
  const reactFlow = useReactFlow();
  const nodes = reactFlow.getNodes();

  useEffect(() => {
    reactFlow.fitView({ duration: 300 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length]);

  const addMessageNode = () => {
    const lastNode = nodes.at(-1);
    const lastNodeId = lastNode ? lastNode.id : "0";
    const nextNodeId = String(+lastNodeId + 1);
    const nextNodePosition = {
      x: (lastNode?.position.x || 0) + (lastNode?.width || 0) + 80,
      y: (lastNode?.position.y || 0) + (lastNode?.height || 0),
    };

    reactFlow.setNodes((oldNodes) => [
      ...oldNodes,
      {
        id: nextNodeId,
        type: "Message",
        position: nextNodePosition,
        data: { label: `Message ${nextNodeId}` },
      },
    ]);
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
      <div className="w-1/5 h-screen bg-white shadow-xl text-slate-800">
        <div className="relative px-3 py-4 flex items-center">
          <div className="mx-auto flex items-center gap-2">
            <Shapes size={20} />
            <h1 className="text-xl font-bold">Nodes</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <button
            className="text-white bg-message rounded-md p-4 flex items-center gap-2 hover:bg-message-darkest transition-colors duration-200"
            onClick={addMessageNode}
          >
            <MessageSquareText size={20} />
            <span className="font-semibold text-lg flex-grow text-left">Message</span>
            <Plus size={24} absoluteStrokeWidth />
          </button>
        </div>
      </div>
    </Transition>
  );
};
