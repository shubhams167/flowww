import { Transition } from "@headlessui/react";
import { BadgePlus, Settings, Workflow } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <Transition
      as={React.Fragment}
      appear={true}
      show={true}
      enter="transition-transform duration-300"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <header className="px-4 py-6 shadow-lg flex flex-col gap-10">
        <a
          href="/"
          aria-label="Flowww"
          className="font-serif text-5xl font-bold tracking-wider text-center"
        >
          F
        </a>
        <div className="flex flex-col gap-4 flex-grow">
          <button title="Create Flow" className="p-2 hover:bg-gray-200 rounded-md mx-auto">
            <BadgePlus size={24} absoluteStrokeWidth />
          </button>
          <button title="View Flows" className="p-2 hover:bg-gray-200 rounded-md mx-auto">
            <Workflow size={24} absoluteStrokeWidth />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <button title="Settings" className="p-2 hover:bg-gray-200 rounded-md mx-auto">
            <Settings size={24} />
          </button>
        </div>
      </header>
    </Transition>
  );
};

export default Header;
