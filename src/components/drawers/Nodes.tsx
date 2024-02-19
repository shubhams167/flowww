import { Transition } from "@headlessui/react";
import { AudioLines, ImageIcon, Shapes, SidebarClose, SidebarOpen, TextIcon } from "lucide-react";
import React, { DragEvent, useEffect } from "react";
import { useReactFlow } from "reactflow";
import useLocalStorage from "../../hooks/useLocaleStorage";
import { getNodeObject } from "../../lib/utils";
import { CustomNodeType } from "../nodes";

type Props = {
  show: boolean;
};

const nodeButtons = [
  {
    name: "Text",
    styles: "bg-text hover:bg-text-darkest",
    icon: <TextIcon size={20} />,
  },
  {
    name: "Image",
    styles: "bg-image hover:bg-image-darkest",
    icon: <ImageIcon size={20} />,
  },
  {
    name: "Audio",
    styles: "bg-audio hover:bg-audio-darkest",
    icon: <AudioLines size={20} />,
  },
] as const;

export const NodesDrawer = ({ show }: Props) => {
  const reactFlow = useReactFlow();
  const nodes = reactFlow.getNodes();
  const [showExpanded, setShowExpanded] = useLocalStorage("showExpandedNodesDrawer", false);

  useEffect(() => {
    reactFlow.fitView({ duration: 300 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length]);

  const addNode = (nodeType: CustomNodeType) => {
    const lastNode = nodes.at(-1);
    const nextNodePosition = {
      x: (lastNode?.position.x || 0) + (lastNode?.width || 0) + 80,
      y: (lastNode?.position.y || 0) + (lastNode?.height || 0) / 2,
    };
    const newNode = getNodeObject(nodes, nodeType, nextNodePosition);

    reactFlow.setNodes((oldNodes) => [...oldNodes, newNode]);
  };

  const onDragStart = (event: DragEvent<HTMLButtonElement>, nodeType: CustomNodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Transition
      as={React.Fragment}
      appear={true}
      show={show}
      enter="transition-all duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div
        className={`absolute right-0 flex h-screen flex-col bg-white text-slate-800 shadow-xl transition-all duration-200 ${
          showExpanded ? "w-2/12" : "w-[72px]"
        }`}
      >
        <div className="relative flex items-center px-3 py-6">
          <div className="mx-auto flex items-center gap-2">
            <Shapes size={24} />
            {showExpanded && <h1 className="text-xl font-bold leading-6">Nodes</h1>}
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-2 p-3">
          {nodeButtons.map((nodeButton) => (
            <button
              key={nodeButton.name}
              className={`flex cursor-grab items-center justify-center gap-2 rounded-md p-3 text-white transition-colors duration-200 active:cursor-grabbing ${nodeButton.styles}`}
              onClick={() => addNode(nodeButton.name)}
              onDragStart={(event) => onDragStart(event, nodeButton.name)}
              title={nodeButton.name}
              draggable
            >
              {nodeButton.icon}
              {showExpanded && (
                <span className="flex-grow text-left text-lg font-semibold leading-5">{nodeButton.name}</span>
              )}
            </button>
          ))}
        </div>
        <div className="flex justify-end px-3 py-6">
          <button
            className="rounded-md p-3 text-slate-700 transition-colors duration-200 hover:bg-slate-200"
            onClick={() => setShowExpanded((prev) => !prev)}
          >
            {showExpanded ? <SidebarOpen size={20} /> : <SidebarClose size={20} />}
          </button>
        </div>
      </div>
    </Transition>
  );
};
