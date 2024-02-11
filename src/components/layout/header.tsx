import { Transition } from "@headlessui/react";
import { BadgePlus, Home, Settings, UploadCloud, Workflow } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";

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
      <header className="px-4 py-6 h-screen shadow-lg flex flex-col gap-10 text-slate-800">
        <NavLink
          to="/"
          aria-label="Flowww"
          className="font-serif text-5xl font-bold tracking-wider text-center"
        >
          F
        </NavLink>
        <div className="flex flex-col gap-4 flex-grow">
          <NavLink to="/" title="Home" className="p-2 hover:bg-gray-200 rounded-md mx-auto">
            <Home size={24} absoluteStrokeWidth />
          </NavLink>
          <NavLink
            to={isCreatePage ? location.pathname : "/create"}
            title="Create a flow"
            className="p-2 hover:bg-gray-200 rounded-md mx-auto"
          >
            <BadgePlus size={24} absoluteStrokeWidth />
          </NavLink>
          <NavLink
            to="/view"
            title="See your flows"
            className="p-2 hover:bg-gray-200 rounded-md mx-auto"
          >
            <Workflow size={24} absoluteStrokeWidth />
          </NavLink>
        </div>
        <div className="flex flex-col gap-4">
          {location?.pathname.match(/\/create/) && (
            <button
              onClick={() => null}
              title="Publish flow"
              className="p-2 hover:bg-gray-200 rounded-md mx-auto"
            >
              <UploadCloud size={24} />
            </button>
          )}
          <NavLink
            to="/settings"
            title="Settings"
            className="p-2 hover:bg-gray-200 rounded-md mx-auto"
          >
            <Settings size={24} />
          </NavLink>
        </div>
      </header>
    </Transition>
  );
};

export default Header;
