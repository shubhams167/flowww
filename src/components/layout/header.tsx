import { Transition } from "@headlessui/react";
import { BadgePlus, Home, Settings, Workflow } from "lucide-react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isCreatePage = !!location.pathname.match(/\/create/);

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
      <header className="flex h-screen flex-col gap-10 px-4 py-6 text-slate-800 shadow-lg">
        <NavLink to="/" aria-label="Flowww" className="text-center font-serif text-5xl font-bold tracking-wider">
          F
        </NavLink>
        <div className="flex flex-grow flex-col gap-4">
          <NavLink to="/" title="Home" className="mx-auto rounded-md p-2 hover:bg-gray-200">
            <Home size={24} absoluteStrokeWidth />
          </NavLink>
          <NavLink
            to={isCreatePage ? location.pathname : "/create"}
            title="Create a flow"
            className="mx-auto rounded-md p-2 hover:bg-gray-200"
          >
            <BadgePlus size={24} absoluteStrokeWidth />
          </NavLink>
          <NavLink to="/manage" title="Manage your flows" className="mx-auto rounded-md p-2 hover:bg-gray-200">
            <Workflow size={24} absoluteStrokeWidth />
          </NavLink>
        </div>
        <div className="flex flex-col gap-4">
          <NavLink to="/settings" title="Settings" className="mx-auto rounded-md p-2 hover:bg-gray-200">
            <Settings size={24} />
          </NavLink>
        </div>
      </header>
    </Transition>
  );
};

export default Header;
